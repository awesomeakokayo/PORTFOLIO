import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "2349020372640";
const WHATSAPP_MESSAGE = "Hi Awesome, I found your portfolio and I'd like to discuss a project.";

export default function WhatsAppCTA() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.intersectionRatio >= 0.2),
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className={`group fixed right-4 bottom-[calc(16px+env(safe-area-inset-bottom))] z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[#25D366]/40 bg-[#0d1711] text-[#d8ffe5] shadow-[0_14px_45px_rgba(0,0,0,.3)] transition-all duration-200 ${hidden ? "pointer-events-none opacity-0" : "opacity-100"}`}
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#25D366]/20 bg-[#0d1711]/95 px-2.5 py-1 text-[10px] font-bold text-[#d8ffe5] opacity-0 transition-all duration-200 md:group-hover:opacity-100 md:group-hover:-translate-x-1">WhatsApp me</span>
      <MessageCircle className="h-5 w-5 text-[#25D366]" />
    </a>
  );
}
