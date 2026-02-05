import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">H</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Hire<span className="text-primary-400">Script</span>
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-md">
              AI-powered job description and interview kit generator. Write bias-free job posts that attract the right people.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/app" className="text-stone-400 hover:text-white transition-colors text-sm">
                  Job Description Generator
                </Link>
              </li>
              <li>
                <Link href="/app" className="text-stone-400 hover:text-white transition-colors text-sm">
                  Interview Kit
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-stone-400 hover:text-white transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-stone-400 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-stone-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-stone-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-sm">
            © {new Date().getFullYear()} HireScript. All rights reserved.
          </p>
          <p className="text-stone-500 text-sm">
            Built by{" "}
            <a
              href="https://automatik.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Automatik.studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
