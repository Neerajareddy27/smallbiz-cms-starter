"use client";
// Contact form. Posts to the `submitInquiry` server action, which saves to the database.
import { useActionState } from "react";
import { submitInquiry } from "@/lib/contact-action";

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitInquiry, undefined);

  if (state?.ok) {
    return (
      <div role="status" className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="font-serif text-2xl font-semibold text-green-900">Thank you!</h3>
        <p className="mt-2 text-green-800">We&apos;ve received your message and will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Honeypot: hidden from people, tempting to bots. Filled -> submission silently dropped. */}
      <div className="hidden" aria-hidden="true">
        <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">Name *</label>
          <input id="name" name="name" required maxLength={100} autoComplete="name" className="input" />
        </div>
        <div>
          <label htmlFor="email" className="label">Email *</label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className="input" />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="label">Phone</label>
        <input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className="input" />
      </div>
      <div>
        <label htmlFor="message" className="label">Message *</label>
        <textarea id="message" name="message" required rows={5} maxLength={3000} className="input" />
      </div>
      {state?.error && <p role="alert" className="text-sm text-red-600">{state.error}</p>}
      <button type="submit" disabled={pending} className="btn-primary w-full sm:w-auto">{pending ? "Sending…" : "Send message"}</button>
    </form>
  );
}
