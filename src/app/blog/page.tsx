import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — HireScript | Tips for Writing Better Job Descriptions",
  description:
    "Practical guides on writing inclusive job descriptions, attracting top talent, and using AI to streamline your hiring process.",
  openGraph: {
    title: "Blog — HireScript",
    description: "Practical guides on writing inclusive job descriptions and attracting top talent.",
    url: "https://hirescript-ten.vercel.app/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Blog
        </h1>
        <p className="text-stone-500 text-lg mb-12 max-w-2xl">
          Practical tips on writing job descriptions, inclusive hiring, and using AI to build better teams.
        </p>

        {posts.length === 0 ? (
          <p className="text-stone-400">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="card p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge-primary text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="font-heading text-xl font-semibold text-foreground hover:text-primary-600 transition-colors mb-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-stone-500 text-sm leading-relaxed mb-3">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-xs text-stone-400">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
