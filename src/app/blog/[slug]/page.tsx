import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — HireScript Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `https://hirescript-ten.vercel.app/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/blog"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium mb-8 inline-block"
        >
          ← Back to Blog
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="badge-primary text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-stone-500 text-lg mb-3">{post.description}</p>
            <time className="text-sm text-stone-400">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </header>

          <div
            className="prose-output text-stone-600"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />
        </article>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl text-center">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
            Ready to write better job descriptions?
          </h3>
          <p className="text-stone-500 mb-6 max-w-md mx-auto">
            Try HireScript free — generate bias-free job posts, interview questions, and scoring rubrics in seconds.
          </p>
          <Link href="/app" className="btn-primary inline-block">
            Try HireScript Free →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
