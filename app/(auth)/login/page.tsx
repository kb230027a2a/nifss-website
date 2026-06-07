"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Shield, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";

type FormData = { email: string; password: string };

export default function LoginPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { ...data, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center font-heading font-bold text-navy-950 text-2xl mx-auto mb-4">N</div>
          <h1 className="font-heading text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-navy-400 mt-2 text-sm">Sign in to your NIFSS account</p>
        </div>

        <div className="card-dark">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-5 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-navy-300 mb-1.5">Email Address</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">Email is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  {...register("password", { required: true })}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 hover:text-navy-300">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">Password is required</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
              {loading ? "Signing in..." : <><Shield className="w-4 h-4" /> Sign In</>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-navy-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-gold-400 hover:text-gold-300 font-medium">
              Register here
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-navy-600 mt-6">
          Admin access: contact{" "}
          <a href="mailto:admin@nifss.org" className="text-navy-500 hover:text-gold-400">admin@nifss.org</a>
        </p>
      </div>
    </div>
  );
}
