"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComingSoonModal from "@/components/ComingSoonModal";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "AI Job Descriptions",
    description: "Generate complete, professional job descriptions in seconds. Optimized for clarity and inclusivity.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Bias-Free Language",
    description: "Built-in bias detection highlights gendered, ageist, or exclusionary language and suggests alternatives.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Interview Questions",
    description: "Get tailored behavioral and technical questions for any role, complete with what to look for in answers.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Scoring Rubrics",
    description: "Structured evaluation criteria so your hiring team stays aligned and makes consistent decisions.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: "Export & Share",
    description: "Copy to clipboard or download your job posts. Formatted and ready for any job board.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Powered by Claude AI",
    description: "Built on Anthropic's Claude for nuanced, thoughtful content that sounds human — not robotic.",
  },
];

const steps = [
  {
    num: "01",
    title: "Enter Role Details",
    description: "Add the job title, department, key responsibilities, and work arrangement.",
  },
  {
    num: "02",
    title: "AI Generates Your Kit",
    description: "Claude AI crafts a bias-free job description, interview questions, and scoring rubric.",
  },
  {
    num: "03",
    title: "Download & Post",
    description: "Copy your polished content directly to any job board or share with your team.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying it out",
    features: ["3 generations per month", "Job descriptions", "Basic interview questions", "Copy to clipboard"],
    cta: "Get Started",
    ctaLink: "/app",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "For growing teams",
    features: [
      "15 generations per month",
      "Job descriptions + bias analysis",
      "Full interview kits",
      "Scoring rubrics",
      "Export to PDF",
      "Priority support",
    ],
    cta: "Coming Soon",
    ctaLink: "#",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$39",
    period: "/month",
    description: "For HR teams & agencies",
    features: [
      "Unlimited generations",
      "Everything in Starter",
      "Team collaboration",
      "Custom templates",
      "API access",
      "Dedicated support",
    ],
    cta: "Coming Soon",
    ctaLink: "#",
    highlighted: false,
  },
];

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handlePlanClick = (plan: typeof plans[0]) => {
    // Track click
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "pricing_click", plan: plan.name }),
    }).catch(() => {});

    if (plan.ctaLink === "#") {
      setSelectedPlan(plan.name);
      setModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="badge-primary mb-6 inline-flex">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI-Powered Hiring Tools
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Write job posts that attract{" "}
              <span className="text-primary-600">the right people</span>
            </h1>
            <p className="text-lg sm:text-xl text-stone-500 mb-10 leading-relaxed">
              Generate bias-free job descriptions, interview questions, and scoring rubrics in seconds. 
              Built for HR managers and startup founders who care about inclusive hiring.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/app" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Start Generating — It&apos;s Free
              </Link>
              <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                See How It Works
              </a>
            </div>
            <p className="mt-4 text-sm text-stone-400">No sign-up required · 3 free generations per month</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How it works
            </h2>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              Three simple steps to create professional, inclusive hiring materials.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center relative">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="font-heading font-bold text-2xl text-primary-600">{step.num}</span>
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">{step.title}</h3>
                <p className="text-stone-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to hire better
            </h2>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              From job descriptions to interview kits — one tool, complete hiring materials.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              Start free. Upgrade when you&apos;re ready.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`card p-8 relative ${
                  plan.highlighted
                    ? "border-2 border-primary-600 shadow-lg shadow-primary-100"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge-primary text-xs font-semibold px-4 py-1">Most Popular</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground">{plan.name}</h3>
                  <p className="text-stone-400 text-sm mt-1">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="font-heading text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-stone-400 text-sm ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-stone-600">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.ctaLink === "/app" ? (
                  <Link href="/app" className="btn-primary w-full text-center block">
                    {plan.cta}
                  </Link>
                ) : (
                  <button
                    onClick={() => handlePlanClick(plan)}
                    className={`w-full font-semibold px-6 py-3 rounded-btn transition-all duration-200 ${
                      plan.highlighted
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to write better job posts?
          </h2>
          <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
            Join hundreds of HR professionals using AI to create inclusive, effective hiring materials.
          </p>
          <Link href="/app" className="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-btn text-lg hover:bg-primary-50 transition-colors shadow-lg">
            Get Started Free →
          </Link>
        </div>
      </section>

      <Footer />
      <ComingSoonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} planName={selectedPlan} />
    </div>
  );
}
