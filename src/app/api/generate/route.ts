import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobTitle, department, responsibilities, niceToHaves, workMode } = body;

    if (!jobTitle || typeof jobTitle !== "string") {
      return NextResponse.json({ error: "Job title is required." }, { status: 400 });
    }

    const prompt = `You are an expert HR consultant specializing in inclusive, bias-free job descriptions. Generate a complete, professional job description based on the following details.

Job Title: ${jobTitle}
${department ? `Department: ${department}` : ""}
${responsibilities ? `Key Responsibilities:\n${responsibilities}` : ""}
${niceToHaves ? `Nice-to-Haves:\n${niceToHaves}` : ""}
Work Arrangement: ${workMode || "remote"}

INSTRUCTIONS:
1. Write a complete job description with these sections:
   - About the Role (2-3 sentences)
   - What You'll Do (bullet points)
   - What We're Looking For (requirements as bullet points)
   - Nice to Have (if provided)
   - What We Offer (benefits - make reasonable assumptions)
   - Work Arrangement

2. Use inclusive, bias-free language throughout:
   - Avoid gendered terms (he/she → they, mankind → humanity)
   - Avoid ageist language (young/energetic → motivated/dynamic)
   - Avoid ability-biased language
   - Use "you" instead of "the ideal candidate"
   - Limit requirements to what's truly necessary

3. After the job description, provide a bias analysis in this exact JSON format:

IMPORTANT: Return your response in this exact JSON format (and nothing else):
{
  "jobDescription": "The full formatted job description text here",
  "biasScore": 85,
  "biasWarnings": [
    {
      "original": "problematic phrase found or avoided",
      "suggestion": "inclusive alternative used",
      "reason": "brief explanation"
    }
  ]
}

The biasScore should be 0-100 where 100 = perfectly inclusive.
If the description is already inclusive, biasWarnings can be empty but still include the score.
Only return valid JSON, no markdown code fences.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response format." }, { status: 500 });
    }

    let result;
    try {
      // Try to parse the JSON response, handling potential markdown code fences
      let text = content.text.trim();
      if (text.startsWith("```")) {
        text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
      }
      result = JSON.parse(text);
    } catch {
      // If JSON parsing fails, return the raw text as the job description
      result = {
        jobDescription: content.text,
        biasScore: 80,
        biasWarnings: [],
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Generate error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
