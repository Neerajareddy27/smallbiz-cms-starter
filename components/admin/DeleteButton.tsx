"use client";
// Small delete button that asks for confirmation, then runs a (bound) server action.
export default function DeleteButton({ action, label = "Delete", confirmText = "Delete this item? This can't be undone." }: {
  action: () => Promise<void>; label?: string; confirmText?: string;
}) {
  return (
    <form action={action} onSubmit={(e) => { if (!confirm(confirmText)) e.preventDefault(); }}>
      <button type="submit" className="btn btn-sm border border-red-200 bg-white text-red-600 hover:bg-red-50">{label}</button>
    </form>
  );
}
