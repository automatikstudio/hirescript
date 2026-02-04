import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        <div className="prose-output text-stone-600 space-y-6">
          <p className="text-sm text-stone-400">Last updated: February 4, 2026</p>

          <h2>1. Information We Collect</h2>
          <p>
            When you use HireScript, we collect the information you provide to generate job descriptions
            and interview kits, including job titles, responsibilities, and preferences. We also collect
            basic usage analytics to improve our service.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information you provide to:</p>
          <ul>
            <li>Generate job descriptions and interview materials using AI</li>
            <li>Improve the quality and accuracy of our AI-generated content</li>
            <li>Analyze usage patterns to improve the product experience</li>
            <li>Communicate with you about service updates</li>
          </ul>

          <h2>3. AI Processing</h2>
          <p>
            Your input is processed by Anthropic&apos;s Claude AI to generate content. We do not use your
            input data to train AI models. Content is processed in real-time and is not stored by our
            AI provider beyond the duration of the request.
          </p>

          <h2>4. Data Retention</h2>
          <p>
            We retain usage analytics in anonymized form. Generated content is not stored on our servers
            after delivery to your browser. Your input data is not retained after the generation request
            is complete.
          </p>

          <h2>5. Data Sharing</h2>
          <p>
            We do not sell, rent, or share your personal data with third parties, except as necessary
            to provide the service (e.g., processing your input through our AI provider) or as required
            by law.
          </p>

          <h2>6. Cookies and Analytics</h2>
          <p>
            We use minimal analytics to understand how people use HireScript. We do not use advertising
            cookies or tracking pixels from third-party ad networks.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of any personal data
            we hold about you. Contact us at privacy@automatik.studio for any data-related requests.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. We will notify users of significant changes
            by posting the updated policy on this page with a new effective date.
          </p>

          <h2>9. Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us at{" "}
            <a href="mailto:privacy@automatik.studio" className="text-primary-600 hover:text-primary-700">
              privacy@automatik.studio
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
