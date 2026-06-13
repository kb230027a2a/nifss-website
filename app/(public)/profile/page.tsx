"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, CheckCircle2, AlertCircle } from "lucide-react";

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>();

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950">
        <div className="text-navy-400">Loading...</div>
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to change password");
      setSuccess(true);
      reset();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const role = (session?.user as any)?.role;

  return (
    <div className="min-h-screen bg-navy-950 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-white">My Profile</h1>
          <p className="text-navy-400 mt-1">Manage your account settings</p>
        </div>

        {/* Account info */}
        <div className="card-dark mb-6">
          <h2 className="font-heading text-lg font-semibold text-white mb-4">Account Details</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-navy-500 mb-1">Full Name</div>
              <div className="text-white font-medium">{session?.user?.name ?? "—"}</div>
            </div>
            <div>
              <div className="text-navy-500 mb-1">Email Address</div>
              <div className="text-white font-medium">{session?.user?.email}</div>
            </div>
            <div>
              <div className="text-navy-500 mb-1">Account Role</div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                role === "admin" ? "bg-red-500/10 text-red-400" :
                role === "power_user" ? "bg-gold-500/10 text-gold-400" :
                "bg-navy-700 text-navy-300"
              }`}>
                {role === "power_user" ? "Power User" : role?.charAt(0).toUpperCase() + role?.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="card-dark">
          <h2 className="font-heading text-lg font-semibold text-white mb-6">Change Password</h2>

          {success && (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-5 text-green-400 text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Password changed successfully.
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-5 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-navy-300 mb-1.5">
                Current Password *
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  {...register("currentPassword", { required: "Current password is required" })}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 hover:text-navy-300"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-400 text-xs mt-1">{errors.currentPassword.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-300 mb-1.5">
                New Password *
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: { value: 8, message: "Must be at least 8 characters" },
                  })}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                  placeholder="Min. 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 hover:text-navy-300"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-400 text-xs mt-1">{errors.newPassword.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-300 mb-1.5">
                Confirm New Password *
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (v) => v === watch("newPassword") || "Passwords do not match",
                })}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                placeholder="Repeat new password"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3"
            >
              {loading ? "Updating..." : <><Lock className="w-4 h-4" /> Update Password</>}
            </button>
          </form>
        </div>

        {(role === "admin" || role === "power_user") && (
          <div className="mt-4 text-center">
            <a href="/admin" className="text-gold-400 hover:text-gold-300 text-sm transition-colors">
              ← Back to Admin Panel
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
