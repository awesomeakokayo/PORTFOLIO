import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-5 left-5 z-[71] flex h-12 w-12 items-center justify-center border-2 border-[#080808] bg-[#9FE0C1] text-[#080808] shadow-[0_5px_0_#080808] transition hover:-translate-y-1 hover:bg-[#f4f3ef] focus:outline-none md:bottom-7 md:left-7"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
