import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "2349020372640";
const WHATSAPP_MESSAGE = "Hi Awesome, I found your portfolio and I'd like to discuss a project.";

export default function WhatsAppCTA() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-[5.75rem] right-5 z-[69] inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#0d1711] px-4 py-3 text-xs font-bold text-[#d8ffe5] shadow-[0_14px_45px_rgba(0,0,0,.3)] transition hover:-translate-y-1 hover:border-[#25D366]/70 md:bottom-7 md:right-[205px]"
      aria-label="Chat with Awesome Akokayo on WhatsApp"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <MessageCircle className="h-4 w-4 text-[#25D366]" />
      <span className="hidden sm:inline">WhatsApp me</span>
      <ArrowRight className="h-3.5 w-3.5" />
    </a>
  );
}
