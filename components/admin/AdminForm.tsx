"use client";
// Generic admin form wrapper: runs a server action via useActionState and shows
// its error / success message. Fields are passed as children (uncontrolled inputs).
import { useActionState } from "react";
import type { FormState } from "@/lib/admin-actions";

type Props = {
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
  submitLabel?: string;
  children: React.ReactNode;
  className?: string;
};

export default function AdminForm({ action, submitLabel = "Save", children, className = "" }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form action={formAction} className={`space-y-5 ${className}`}>
      {children}
      {state?.error && <p role="alert" className="text-sm text-red-600">{state.error}</p>}
      {state?.ok && <p role="status" className="text-sm text-green-700">Saved ✓</p>}
      <button type="submit" disabled={pending} className="btn-primary">{pending ? "Saving…" : submitLabel}</button>
    </form>
  );
}

/** Label + input/textarea pair used by the admin forms. */
export function Field({ label, name, defaultValue = "", type = "text", textarea = false, rows = 4, required = false, hint, placeholder }: {
  label: string; name: string; defaultValue?: string; type?: string; textarea?: boolean; rows?: number; required?: boolean; hint?: string; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label">{label}{required && " *"}</label>
      {textarea ? (
        <textarea id={name} name={name} defaultValue={defaultValue} rows={rows} required={required} placeholder={placeholder} className="input" />
      ) : (
        <input id={name} name={name} type={type} defaultValue={defaultValue} required={required} placeholder={placeholder} className="input" />
      )}
      {hint && <p className="mt-1 text-xs text-stone-500">{hint}</p>}
    </div>
  );
}
