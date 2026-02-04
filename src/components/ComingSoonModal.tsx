"use client";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export default function ComingSoonModal({ isOpen, onClose, planName }: ComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-card shadow-2xl max-w-md w-full p-8 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-heading font-bold text-xl text-foreground mb-2">
            {planName} Plan — Coming Soon!
          </h3>
          <p className="text-stone-500 text-sm mb-6">
            We&apos;re working on bringing you premium features. In the meantime, enjoy the free tier with 3 generations per month.
          </p>
          <button onClick={onClose} className="btn-primary w-full">
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
