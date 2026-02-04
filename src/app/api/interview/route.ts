import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobTitle } = body;

    if (!jobTitle || typeof jobTitle !== "string") {
      return NextResponse.json({ error: "Job title is required." }, { status: 400 });
    }

    const prompt = `You are an expert interview coach and HR consultant. Generate a comprehensive interview kit for the following role:

Job Title: ${jobTitle}

Generate:
1. 5 behavioral interview questions with what to look for in answers
2. 5 technical/role-specific questions with what to look for in answers  
3. A scoring rubric with 5 evaluation criteria

Return your response in this exact JSON format (and nothing else):
{
  "behavioralQuestions": [
    {
      "question": "Tell me about a time when...",
      "whatToLookFor": "Look for evidence of..."
    }
  ],
  "technicalQuestions": [
    {
      "question": "How would you approach...",
      "whatToLookFor": "Strong answers will mention..."
    }
  ],
  "scoringRubric": [
    {
      "criteria": "Communication Skills",
      "excellent": "Clear, concise, adapts to audience",
      "good": "Generally clear, occasional jargon",
      "needsImprovement": "Unclear, rambling, or overly technical"
    }
  ]
}

Make questions specific to the ${jobTitle} role. Include a mix of situational and past-experience questions.
The scoring rubric should cover the most important competencies for this role.
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
      let text = content.text.trim();
      if (text.startsWith("```")) {
        text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
      }
      result = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Interview error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
