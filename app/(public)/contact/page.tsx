"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setSubmitted(true);
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.1)_0%,_transparent_60%)]" />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3 py-1 mb-4">
            <span className="text-gold-400 text-xs font-medium uppercase tracking-wider">Reach Out</span>
          </div>
          <h1 className="font-heading text-5xl font-bold text-white mb-6">
            Get in <span className="text-gold-500">Touch</span>
          </h1>
          <p className="text-navy-300 text-xl max-w-xl mx-auto">
            Questions, partnerships, or consultancy enquiries — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Phone", value: "+92 300 123 4567", href: "tel:+923001234567" },
                { icon: Mail, label: "Email", value: "info@nifss.org", href: "mailto:info@nifss.org" },
                { icon: MapPin, label: "Location", value: "Islamabad, Pakistan", href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="card-dark flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <div className="text-navy-400 text-sm mb-1">{label}</div>
                    <a href={href} className="text-white font-medium hover:text-gold-400 transition-colors">{value}</a>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card-dark">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-navy-400">We'll get back to you within 24–48 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="btn-secondary mt-6 text-sm">Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy-300 mb-1.5">Full Name *</label>
                        <input {...register("name", { required: true })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm" placeholder="Your full name" />
                        {errors.name && <p className="text-red-400 text-xs mt-1">Required</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-300 mb-1.5">Email *</label>
                        <input type="email" {...register("email", { required: true })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm" placeholder="your@email.com" />
                        {errors.email && <p className="text-red-400 text-xs mt-1">Required</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy-300 mb-1.5">Phone</label>
                        <input {...register("phone")} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm" placeholder="+92 300 000 0000" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-300 mb-1.5">Subject *</label>
                        <input {...register("subject", { required: true })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm" placeholder="How can we help?" />
                        {errors.subject && <p className="text-red-400 text-xs mt-1">Required</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-300 mb-1.5">Message *</label>
                      <textarea {...register("message", { required: true })} rows={5} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500 transition-colors text-sm resize-none" placeholder="Your message..." />
                      {errors.message && <p className="text-red-400 text-xs mt-1">Required</p>}
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                      {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
