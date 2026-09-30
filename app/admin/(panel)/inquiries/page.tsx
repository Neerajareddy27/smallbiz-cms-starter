// All contact-form submissions, newest first, with a mark-as-read toggle.
import { toggleInquiryRead } from "@/lib/admin-actions";
import { db } from "@/lib/db";

export default async function InquiriesAdmin() {
  const inquiries = await db.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <>
      <h1 className="text-2xl font-bold text-stone-900">Inquiries <span className="text-base font-normal text-stone-500">({inquiries.length})</span></h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
            <tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Phone</th><th className="p-3">Message</th><th className="p-3">Date</th><th className="p-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-stone-100 align-top">
            {inquiries.length === 0 && <tr><td colSpan={6} className="p-6 text-stone-500">No inquiries yet.</td></tr>}
            {inquiries.map((q) => (
              <tr key={q.id} className={q.read ? "text-stone-600" : "bg-brand-50/40 font-medium text-stone-900"}>
                <td className="p-3">{q.name}</td>
                <td className="p-3"><a href={`mailto:${q.email}`} className="text-brand-700 hover:underline">{q.email}</a></td>
                <td className="p-3">{q.phone || "—"}</td>
                <td className="max-w-xs whitespace-pre-wrap p-3 font-normal">{q.message}</td>
                <td className="whitespace-nowrap p-3 font-normal">{q.createdAt.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</td>
                <td className="p-3">
                  <form action={toggleInquiryRead.bind(null, q.id, !q.read)}>
                    <button className={`btn btn-sm ${q.read ? "border border-stone-300 bg-white text-stone-600" : "bg-brand-600 text-white"}`}>
                      {q.read ? "Mark unread" : "Mark as read"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
