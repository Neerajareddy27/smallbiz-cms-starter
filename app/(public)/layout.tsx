// Layout for every PUBLIC page (route group "(public)" adds no URL segment).
// Renders the global elements once: navbar, footer, floating WhatsApp/Call buttons,
// and the live-chat widget. The admin panel has its own layout and doesn't get these.
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ChatWidget from "@/components/ChatWidget";
import { getSettings } from "@/lib/data";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <Navbar businessName={settings.businessName} social={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
      <FloatingButtons whatsappNumber={settings.whatsappNumber} phoneNumber={settings.phoneNumber} />
      <ChatWidget businessName={settings.businessName} />
    </>
  );
}
