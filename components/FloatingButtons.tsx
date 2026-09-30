// Floating WhatsApp (wa.me) and Call (tel:) buttons, fixed bottom-left on every public page.
// (The chat widget owns the bottom-right corner.) Each button hides if its number is empty.
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { telLink, whatsappLink } from "@/lib/utils";

export default function FloatingButtons({ whatsappNumber, phoneNumber }: { whatsappNumber: string; phoneNumber: string }) {
  return (
    <div className="fixed bottom-5 left-4 z-50 flex flex-col gap-3 sm:left-6">
      {whatsappNumber && (
        <a href={whatsappLink(whatsappNumber)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105">
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      )}
      {phoneNumber && (
        <a href={telLink(phoneNumber)} aria-label="Call us"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition hover:scale-105">
          <PhoneIcon className="h-6 w-6" />
        </a>
      )}
    </div>
  );
}
