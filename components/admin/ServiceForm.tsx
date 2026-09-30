// Shared add/edit form for services. `action` is createService or updateService.bind(null, id).
import AdminForm, { Field } from "./AdminForm";
import type { FormState } from "@/lib/admin-actions";

type Props = {
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
  service?: { name: string; description: string; price: string; imageUrl: string; featured: boolean };
};

export default function ServiceForm({ action, service }: Props) {
  return (
    <AdminForm action={action} submitLabel={service ? "Save changes" : "Add service"} className="rounded-2xl border border-stone-200 bg-white p-6">
      <Field label="Name" name="name" defaultValue={service?.name} required />
      <Field label="Description" name="description" defaultValue={service?.description} textarea required />
      <Field label="Price" name="price" defaultValue={service?.price} hint='Free text, e.g. "$45", "From $45" or "Custom quote".' />
      <Field label="Image URL" name="imageUrl" defaultValue={service?.imageUrl} placeholder="https://… or /samples/service-1.svg" hint="Paste a link to the image (upload it to any image host first)." />
      <label className="flex items-center gap-2 text-sm text-stone-700">
        <input type="checkbox" name="featured" defaultChecked={service?.featured} className="h-4 w-4 accent-brand-600" />
        Feature on the Home page
      </label>
    </AdminForm>
  );
}
