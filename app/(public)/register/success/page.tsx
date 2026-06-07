import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4 pt-20">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-12 h-12 text-green-400" />
        </div>
        <h1 className="font-heading text-4xl font-bold text-white mb-4">
          Registration <span className="text-gold-500">Complete!</span>
        </h1>
        <p className="text-navy-300 text-lg mb-3">
          Welcome to NIFSS! Your payment has been confirmed.
        </p>
        <p className="text-navy-500 text-sm mb-8">
          You'll receive a confirmation email shortly with your membership details.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">Return to Home</Link>
          <Link href="/events" className="btn-secondary">Browse Events</Link>
        </div>
      </div>
    </div>
  );
}
