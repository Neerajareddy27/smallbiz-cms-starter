// Edit the About page content.
import AdminForm, { Field } from "@/components/admin/AdminForm";
import { saveAbout } from "@/lib/admin-actions";
import { getAbout } from "@/lib/data";

export default async function AboutAdmin() {
  const about = await getAbout();
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-stone-900">About page</h1>
      <AdminForm action={saveAbout} className="rounded-2xl border border-stone-200 bg-white p-6">
        <Field label="Headline" name="title" defaultValue={about?.title} required />
        <Field label="Story" name="body" defaultValue={about?.body} textarea rows={12} required hint="Leave a blank line between paragraphs." />
        <Field label="Image URL" name="imageUrl" defaultValue={about?.imageUrl} placeholder="https://…" />
      </AdminForm>
    </>
  );
}
