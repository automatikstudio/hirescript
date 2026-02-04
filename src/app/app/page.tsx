"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Tab = "jd" | "interview";
type WorkMode = "remote" | "hybrid" | "onsite";

interface BiasWarning {
  original: string;
  suggestion: string;
  reason: string;
}

interface JDResult {
  jobDescription: string;
  biasScore: number;
  biasWarnings: BiasWarning[];
}

interface InterviewResult {
  behavioralQuestions: { question: string; whatToLookFor: string }[];
  technicalQuestions: { question: string; whatToLookFor: string }[];
  scoringRubric: { criteria: string; excellent: string; good: string; needsImprovement: string }[];
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-500 hover:text-primary-600 bg-stone-100 hover:bg-primary-50 rounded-btn transition-colors"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function LoadingDots() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-4">
        <div className="loading-dots text-primary-600">
          <span /><span /><span />
        </div>
        <p className="text-stone-500 text-sm animate-pulse">Generating with AI...</p>
      </div>
    </div>
  );
}

function BiasScoreBadge({ score }: { score: number }) {
  const color = score >= 90 ? "emerald" : score >= 70 ? "amber" : "red";
  const label = score >= 90 ? "Excellent" : score >= 70 ? "Good" : "Needs Review";
  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
    red: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${colorClasses[color]}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      Bias Check: {score}/100 — {label}
    </div>
  );
}

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<Tab>("jd");

  // JD form state
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [niceToHaves, setNiceToHaves] = useState("");
  const [workMode, setWorkMode] = useState<WorkMode>("remote");
  const [jdLoading, setJdLoading] = useState(false);
  const [jdResult, setJdResult] = useState<JDResult | null>(null);
  const [jdError, setJdError] = useState("");

  // Interview form state
  const [interviewTitle, setInterviewTitle] = useState("");
  const [interviewLoading, setInterviewLoading] = useState(false);
  const [interviewResult, setInterviewResult] = useState<InterviewResult | null>(null);
  const [interviewError, setInterviewError] = useState("");

  const generateJD = useCallback(async () => {
    if (!jobTitle.trim()) {
      setJdError("Please enter a job title.");
      return;
    }
    setJdLoading(true);
    setJdError("");
    setJdResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: jobTitle.trim(),
          department: department.trim(),
          responsibilities: responsibilities.trim(),
          niceToHaves: niceToHaves.trim(),
          workMode,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate. Please try again.");
      }

      const data = await res.json();
      setJdResult(data);
    } catch (err) {
      setJdError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setJdLoading(false);
    }
  }, [jobTitle, department, responsibilities, niceToHaves, workMode]);

  const generateInterview = useCallback(async () => {
    if (!interviewTitle.trim()) {
      setInterviewError("Please enter a job title.");
      return;
    }
    setInterviewLoading(true);
    setInterviewError("");
    setInterviewResult(null);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle: interviewTitle.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate. Please try again.");
      }

      const data = await res.json();
      setInterviewResult(data);
    } catch (err) {
      setInterviewError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setInterviewLoading(false);
    }
  }, [interviewTitle]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">HireScript Generator</h1>
          <p className="text-stone-500 mt-2">Create professional, bias-free hiring materials with AI.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-stone-100 p-1 rounded-card mb-8 max-w-md">
          <button
            onClick={() => setActiveTab("jd")}
            className={`flex-1 px-4 py-2.5 rounded-btn text-sm font-medium transition-all ${
              activeTab === "jd"
                ? "bg-white text-primary-600 shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            Job Description
          </button>
          <button
            onClick={() => setActiveTab("interview")}
            className={`flex-1 px-4 py-2.5 rounded-btn text-sm font-medium transition-all ${
              activeTab === "interview"
                ? "bg-white text-primary-600 shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            Interview Kit
          </button>
        </div>

        {/* JD Tab */}
        {activeTab === "jd" && (
          <div className="animate-fade-in">
            <div className="card p-6 sm:p-8 mb-8">
              <h2 className="font-heading font-semibold text-lg mb-6">Job Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Job Title *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Department</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Engineering"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Key Responsibilities</label>
                <textarea
                  className="input-field min-h-[100px] resize-y"
                  placeholder="List the main responsibilities, one per line..."
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Nice-to-Haves</label>
                <textarea
                  className="input-field min-h-[80px] resize-y"
                  placeholder="Optional skills or experience that would be a plus..."
                  value={niceToHaves}
                  onChange={(e) => setNiceToHaves(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-700 mb-2">Work Arrangement</label>
                <div className="flex gap-3">
                  {(["remote", "hybrid", "onsite"] as WorkMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setWorkMode(mode)}
                      className={`px-4 py-2 rounded-btn text-sm font-medium transition-all border ${
                        workMode === mode
                          ? "bg-primary-600 text-white border-primary-600"
                          : "bg-white text-stone-600 border-stone-300 hover:border-primary-300"
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {jdError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-btn text-red-700 text-sm">
                  {jdError}
                </div>
              )}
              <button
                onClick={generateJD}
                disabled={jdLoading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {jdLoading ? "Generating..." : "Generate Job Description"}
              </button>
            </div>

            {/* JD Output */}
            {jdLoading && <LoadingDots />}
            {jdResult && (
              <div className="card p-6 sm:p-8 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h2 className="font-heading font-semibold text-lg">Generated Job Description</h2>
                  <div className="flex items-center gap-3">
                    <BiasScoreBadge score={jdResult.biasScore} />
                    <CopyButton text={jdResult.jobDescription} />
                  </div>
                </div>

                {/* Bias warnings */}
                {jdResult.biasWarnings.length > 0 && (
                  <div className="mb-6 p-4 bg-accent-50 border border-accent-200 rounded-card">
                    <h3 className="font-heading font-semibold text-sm text-accent-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      Bias Warnings
                    </h3>
                    <div className="space-y-2">
                      {jdResult.biasWarnings.map((w, i) => (
                        <div key={i} className="text-sm">
                          <span className="text-accent-600 font-medium line-through">{w.original}</span>
                          {" → "}
                          <span className="text-emerald-700 font-medium">{w.suggestion}</span>
                          <span className="text-stone-500 ml-2">({w.reason})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="prose-output whitespace-pre-wrap text-stone-700 bg-stone-50 p-6 rounded-card border border-stone-200">
                  {jdResult.jobDescription}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Interview Tab */}
        {activeTab === "interview" && (
          <div className="animate-fade-in">
            <div className="card p-6 sm:p-8 mb-8">
              <h2 className="font-heading font-semibold text-lg mb-6">Interview Kit Generator</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Job Title *</label>
                <input
                  type="text"
                  className="input-field max-w-md"
                  placeholder="e.g. Product Manager"
                  value={interviewTitle}
                  onChange={(e) => setInterviewTitle(e.target.value)}
                />
              </div>
              {interviewError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-btn text-red-700 text-sm">
                  {interviewError}
                </div>
              )}
              <button
                onClick={generateInterview}
                disabled={interviewLoading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {interviewLoading ? "Generating..." : "Generate Interview Kit"}
              </button>
            </div>

            {interviewLoading && <LoadingDots />}
            {interviewResult && (
              <div className="space-y-6 animate-fade-in">
                {/* Behavioral */}
                <div className="card p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading font-semibold text-lg">Behavioral Questions</h2>
                    <CopyButton
                      text={interviewResult.behavioralQuestions
                        .map((q, i) => `${i + 1}. ${q.question}\n   Look for: ${q.whatToLookFor}`)
                        .join("\n\n")}
                    />
                  </div>
                  <div className="space-y-4">
                    {interviewResult.behavioralQuestions.map((q, i) => (
                      <div key={i} className="p-4 bg-stone-50 rounded-card border border-stone-200">
                        <p className="font-medium text-foreground mb-2">
                          {i + 1}. {q.question}
                        </p>
                        <p className="text-sm text-stone-500">
                          <span className="font-medium text-primary-600">Look for:</span> {q.whatToLookFor}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical */}
                <div className="card p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading font-semibold text-lg">Technical Questions</h2>
                    <CopyButton
                      text={interviewResult.technicalQuestions
                        .map((q, i) => `${i + 1}. ${q.question}\n   Look for: ${q.whatToLookFor}`)
                        .join("\n\n")}
                    />
                  </div>
                  <div className="space-y-4">
                    {interviewResult.technicalQuestions.map((q, i) => (
                      <div key={i} className="p-4 bg-stone-50 rounded-card border border-stone-200">
                        <p className="font-medium text-foreground mb-2">
                          {i + 1}. {q.question}
                        </p>
                        <p className="text-sm text-stone-500">
                          <span className="font-medium text-primary-600">Look for:</span> {q.whatToLookFor}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scoring Rubric */}
                <div className="card p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading font-semibold text-lg">Scoring Rubric</h2>
                    <CopyButton
                      text={interviewResult.scoringRubric
                        .map(
                          (r) =>
                            `${r.criteria}\n  Excellent: ${r.excellent}\n  Good: ${r.good}\n  Needs Improvement: ${r.needsImprovement}`
                        )
                        .join("\n\n")}
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-stone-200">
                          <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">Criteria</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold text-emerald-700">Excellent</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold text-amber-700">Good</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold text-red-700">Needs Improvement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {interviewResult.scoringRubric.map((r, i) => (
                          <tr key={i} className="border-b border-stone-100">
                            <td className="py-3 px-4 font-medium text-foreground">{r.criteria}</td>
                            <td className="py-3 px-4 text-stone-600">{r.excellent}</td>
                            <td className="py-3 px-4 text-stone-600">{r.good}</td>
                            <td className="py-3 px-4 text-stone-600">{r.needsImprovement}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
