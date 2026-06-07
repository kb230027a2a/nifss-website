"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  organization: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password, organization: data.organization }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Signup failed");
      router.push("/login?registered=1");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center font-heading font-bold text-navy-950 text-2xl mx-auto mb-4">N</div>
          <h1 className="font-heading text-3xl font-bold text-white">Create Account</h1>
          <p className="text-navy-400 mt-2 text-sm">Join the NIFSS community</p>
        </div>

        <div className="card-dark">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-5 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-300 mb-1.5">Full Name *</label>
              <input {...register("name", { required: true })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm" placeholder="Your full name" />
              {errors.name && <p className="text-red-400 text-xs mt-1">Required</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-300 mb-1.5">Email Address *</label>
              <input type="email" {...register("email", { required: true })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm" placeholder="your@email.com" />
              {errors.email && <p className="text-red-400 text-xs mt-1">Required</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-300 mb-1.5">Organisation</label>
              <input {...register("organization")} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm" placeholder="University / Agency / Company" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-300 mb-1.5">Password *</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} {...register("password", { required: true, minLength: 8 })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm" placeholder="Min. 8 characters" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 hover:text-navy-300">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">Min. 8 characters required</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-300 mb-1.5">Confirm Password *</label>
              <input type="password" {...register("confirmPassword", { validate: (v) => v === watch("password") || "Passwords don't match" })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm" placeholder="Repeat password" />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
              {loading ? "Creating account..." : <><UserPlus className="w-4 h-4" /> Create Account</>}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-navy-500">
            Already have an account?{" "}
            <Link href="/login" className="text-gold-400 hover:text-gold-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
