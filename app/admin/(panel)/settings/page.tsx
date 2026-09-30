// Site settings: contact channels + social links (used by the floating buttons, navbar and footer),
// plus business name/tagline/hero copy shown on the Home page.
import AdminForm, { Field } from "@/components/admin/AdminForm";
import { saveSettings } from "@/lib/admin-actions";
import { getSettings } from "@/lib/data";

export default async function SettingsAdmin() {
  const s = await getSettings();
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-stone-900">Settings</h1>
      <AdminForm action={saveSettings} className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="font-semibold text-stone-900">Business & home page</h2>
        <Field label="Business name" name="businessName" defaultValue={s.businessName} required />
        <Field label="Tagline" name="tagline" defaultValue={s.tagline} />
        <Field label="Hero title" name="heroTitle" defaultValue={s.heroTitle} />
        <Field label="Hero subtitle" name="heroSubtitle" defaultValue={s.heroSubtitle} textarea rows={3} />
        <Field label="Hero image URL" name="heroImageUrl" defaultValue={s.heroImageUrl} />

        <h2 className="border-t border-stone-200 pt-5 font-semibold text-stone-900">Contact</h2>
        <Field label="WhatsApp number" name="whatsappNumber" defaultValue={s.whatsappNumber} hint="With country code, e.g. +1 555 123 4567. Leave empty to hide the WhatsApp button." />
        <Field label="Phone number" name="phoneNumber" defaultValue={s.phoneNumber} hint="Leave empty to hide the Call button." />
        <Field label="Email" name="email" type="email" defaultValue={s.email} />
        <Field label="Address" name="address" defaultValue={s.address} />

        <h2 className="border-t border-stone-200 pt-5 font-semibold text-stone-900">Social media</h2>
        <Field label="Instagram URL" name="instagramUrl" defaultValue={s.instagramUrl} />
        <Field label="Facebook URL" name="facebookUrl" defaultValue={s.facebookUrl} />
        <Field label="X / Twitter URL" name="twitterUrl" defaultValue={s.twitterUrl} />
        <Field label="YouTube URL" name="youtubeUrl" defaultValue={s.youtubeUrl} />
      </AdminForm>
    </>
  );
}
