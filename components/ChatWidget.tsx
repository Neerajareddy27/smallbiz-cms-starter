"use client";
// MOCK live-chat widget (UI only, no backend). Opens from a bottom-right bubble and
// answers every message with a canned reply. To make it real later, replace `send()`
// with a call to your chat provider (Crisp, Tawk.to, Intercom...) or an API route.
import { useEffect, useRef, useState } from "react";
import { ChatIcon, CloseIcon, SendIcon } from "./Icons";

type Msg = { from: "bot" | "me"; text: string };

export default function ChatWidget({ businessName }: { businessName: string }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: `Hi there! 👋 Welcome to ${businessName}. How can we help today?` }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: "me", text }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { from: "bot", text: "Thanks for your message! Our team is offline in this demo, so please use the contact form or WhatsApp and we'll reply soon." }]), 800);
  }

  return (
    <div className="fixed bottom-5 right-4 z-50 sm:right-6">
      {open && (
        <div role="dialog" aria-label="Live chat" className="mb-3 flex h-[28rem] max-h-[calc(100vh-7rem)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-brand-600 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">{businessName}</p>
              <p className="text-xs text-brand-100">We typically reply within minutes</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded p-1 hover:bg-white/20"><CloseIcon className="h-5 w-5" /></button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto bg-stone-50 p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <p className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.from === "me" ? "bg-brand-600 text-white" : "border border-stone-200 bg-white text-stone-800"}`}>{m.text}</p>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-stone-200 p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" aria-label="Message" className="input" />
            <button type="submit" aria-label="Send" className="btn-primary px-3!"><SendIcon className="h-4 w-4" /></button>
          </form>
        </div>
      )}
      <button type="button" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close live chat" : "Open live chat"} aria-expanded={open}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-900 text-white shadow-lg transition hover:scale-105">
        {open ? <CloseIcon className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
      </button>
    </div>
  );
}
