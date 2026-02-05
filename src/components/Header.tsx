"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">H</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              Hire<span className="text-primary-600">Script</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-stone-600 hover:text-primary-600 transition-colors text-sm font-medium">
              Features
            </Link>
            <Link href="/#pricing" className="text-stone-600 hover:text-primary-600 transition-colors text-sm font-medium">
              Pricing
            </Link>
            <Link href="/blog" className="text-stone-600 hover:text-primary-600 transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link href="/app" className="btn-primary text-sm">
              Get Started Free
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-btn hover:bg-stone-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-stone-200 animate-fade-in">
            <nav className="flex flex-col gap-3">
              <Link
                href="/#features"
                className="text-stone-600 hover:text-primary-600 transition-colors text-sm font-medium px-2 py-1"
                onClick={() => setMobileOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/#pricing"
                className="text-stone-600 hover:text-primary-600 transition-colors text-sm font-medium px-2 py-1"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
              <Link href="/app" className="btn-primary text-sm text-center" onClick={() => setMobileOpen(false)}>
                Get Started Free
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
