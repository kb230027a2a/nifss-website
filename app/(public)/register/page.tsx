"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { CreditCard, Landmark, CheckCircle2, ArrowRight, Lock } from "lucide-react";

const MEMBERSHIP_TIERS = [
  { id: "student", label: "Student Member", price: 1000, currency: "PKR", desc: "For university students. Access to events at student rates." },
  { id: "general", label: "General Member", price: 3000, currency: "PKR", desc: "For individuals. Full membership with event access." },
  { id: "professional", label: "Professional Member", price: 8000, currency: "PKR", desc: "For forensic professionals. Premium access & newsletter." },
  { id: "corporate", label: "Corporate Member", price: 25000, currency: "PKR", desc: "For organisations. Multiple seats, priority consultancy." },
];

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  membershipType: string;
  notes: string;
};

type PaymentMethod = "stripe" | "paypal" | null;

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-950 flex items-center justify-center text-navy-400">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event");

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTier, setSelectedTier] = useState(MEMBERSHIP_TIERS[1]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      firstName: session?.user?.name?.split(" ")[0] ?? "",
      lastName: session?.user?.name?.split(" ").slice(1).join(" ") ?? "",
      email: session?.user?.email ?? "",
      membershipType: "general",
    },
  });

  const onFormSubmit = (data: FormData) => {
    setFormData({ ...data, membershipType: selectedTier.id });
    setStep(2);
  };

  const handlePayment = async () => {
    if (!paymentMethod || !formData) return;
    setProcessing(true);

    try {
      if (paymentMethod === "stripe") {
        const res = await fetch("/api/payments/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, amount: selectedTier.price, currency: selectedTier.currency, eventId }),
        });
        const { url } = await res.json();
        if (url) window.location.href = url;
      } else if (paymentMethod === "paypal") {
        const res = await fetch("/api/payments/paypal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, amount: selectedTier.price, currency: "USD", eventId }),
        });
        const { approvalUrl } = await res.json();
        if (approvalUrl) window.location.href = approvalUrl;
      }
    } catch {
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-white mb-3">Registration Complete!</h2>
          <p className="text-navy-400 mb-6">Welcome to NIFSS. You'll receive a confirmation email shortly.</p>
          <a href="/" className="btn-primary">Return to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <section className="relative py-16 bg-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="font-heading text-4xl font-bold text-white mb-3">
            Register with <span className="text-gold-500">NIFSS</span>
          </h1>
          <p className="text-navy-400">Join Pakistan's premier forensic think tank</p>
          {/* Steps */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {["Your Details", "Choose Payment", "Confirm"].map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`flex items-center gap-2 text-sm ${step === i + 1 ? "text-gold-400" : step > i + 1 ? "text-green-400" : "text-navy-500"}`}>
                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ${step === i + 1 ? "border-gold-500 bg-gold-500/10 text-gold-400" : step > i + 1 ? "border-green-500 bg-green-500/10 text-green-400" : "border-navy-600 text-navy-600"}`}>
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < 2 && <div className="w-8 h-px bg-navy-700" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-4xl">

          {/* Step 1: Details */}
          {step === 1 && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="card-dark">
                  <h2 className="font-heading text-xl font-bold text-white mb-6">Your Details</h2>
                  <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-navy-300 mb-1.5">First Name *</label>
                        <input {...register("firstName", { required: true })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 text-sm" />
                        {errors.firstName && <p className="text-red-400 text-xs mt-1">Required</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-300 mb-1.5">Last Name *</label>
                        <input {...register("lastName", { required: true })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 text-sm" />
                        {errors.lastName && <p className="text-red-400 text-xs mt-1">Required</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-300 mb-1.5">Email Address *</label>
                      <input type="email" {...register("email", { required: true })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 text-sm" />
                      {errors.email && <p className="text-red-400 text-xs mt-1">Required</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-navy-300 mb-1.5">Phone</label>
                        <input {...register("phone")} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 text-sm" placeholder="+92 300 000 0000" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-300 mb-1.5">Organisation</label>
                        <input {...register("organization")} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-300 mb-3">Membership Type *</label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {MEMBERSHIP_TIERS.map((tier) => (
                          <label key={tier.id} className={`cursor-pointer rounded-xl border p-4 transition-all ${selectedTier.id === tier.id ? "border-gold-500 bg-gold-500/5" : "border-navy-600 hover:border-navy-500"}`}>
                            <input type="radio" className="hidden" checked={selectedTier.id === tier.id} onChange={() => setSelectedTier(tier)} />
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-sm font-semibold text-white">{tier.label}</span>
                              <span className="text-gold-500 text-sm font-bold">PKR {tier.price.toLocaleString()}</span>
                            </div>
                            <p className="text-navy-500 text-xs">{tier.desc}</p>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-300 mb-1.5">Additional Notes</label>
                      <textarea {...register("notes")} rows={3} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 text-sm resize-none" placeholder="Any special requirements..." />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center py-3">
                      Continue to Payment <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
              <div>
                <div className="card-dark sticky top-24">
                  <h3 className="font-heading text-lg font-bold text-white mb-4">Order Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-navy-400">
                      <span>{selectedTier.label}</span>
                      <span>PKR {selectedTier.price.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-navy-700 pt-3 flex justify-between font-semibold text-white">
                      <span>Total</span>
                      <span className="text-gold-500">PKR {selectedTier.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-navy-500">
                    <Lock className="w-3 h-3" /> Secure payment via Stripe or PayPal
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment method */}
          {step === 2 && (
            <div className="max-w-xl mx-auto">
              <div className="card-dark">
                <h2 className="font-heading text-xl font-bold text-white mb-2">Choose Payment Method</h2>
                <p className="text-navy-400 text-sm mb-6">
                  Total: <span className="text-gold-500 font-semibold">PKR {selectedTier.price.toLocaleString()}</span>
                </p>

                <div className="space-y-3 mb-8">
                  {/* Stripe */}
                  <label className={`cursor-pointer block rounded-xl border p-4 transition-all ${paymentMethod === "stripe" ? "border-gold-500 bg-gold-500/5" : "border-navy-600 hover:border-navy-500"}`}>
                    <input type="radio" className="hidden" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} />
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-gold-500" />
                      <div>
                        <div className="text-white font-medium text-sm">Credit / Debit Card</div>
                        <div className="text-navy-400 text-xs">Visa, Mastercard via Stripe — secure payment</div>
                      </div>
                      <div className="ml-auto flex gap-1">
                        {["VISA", "MC"].map((b) => (
                          <span key={b} className="bg-navy-700 text-navy-300 text-xs px-2 py-0.5 rounded font-mono">{b}</span>
                        ))}
                      </div>
                    </div>
                  </label>

                  {/* PayPal */}
                  <label className={`cursor-pointer block rounded-xl border p-4 transition-all ${paymentMethod === "paypal" ? "border-gold-500 bg-gold-500/5" : "border-navy-600 hover:border-navy-500"}`}>
                    <input type="radio" className="hidden" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} />
                    <div className="flex items-center gap-3">
                      <Landmark className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-white font-medium text-sm">PayPal</div>
                        <div className="text-navy-400 text-xs">Pay using your PayPal account</div>
                      </div>
                      <span className="ml-auto bg-blue-500/10 text-blue-400 text-xs px-2 py-0.5 rounded font-bold">PayPal</span>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center text-sm py-2.5">
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={!paymentMethod || processing}
                    className="btn-primary flex-1 justify-center py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? "Redirecting..." : <><Lock className="w-4 h-4" /> Pay Now</>}
                  </button>
                </div>

                <p className="text-center text-xs text-navy-600 mt-4 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> All payments are encrypted and secure
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
