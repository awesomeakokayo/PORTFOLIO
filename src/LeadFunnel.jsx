import React, { useState } from "react";
import { ArrowRight, Check, X, CalendarDays, Mail, ShieldCheck } from "lucide-react";

const steps = [
  { key: "type", title: "What are you trying to build?", options: ["A high-converting website", "A web app / SaaS product", "A mobile app", "AI integration / automation", "Not sure yet"] },
  { key: "budget", title: "What range are you working with?", options: ["₦500k – ₦1m", "₦1m – ₦2m", "₦2m+", "I need help scoping the budget"] },
  { key: "timeline", title: "When do you want to start?", options: ["As soon as possible", "Within 2–4 weeks", "Within 1–2 months", "I'm planning ahead"] },
];

function buildMailto(data) {
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "Not provided"}`,
    `Project: ${data.type}`,
    `Budget: ${data.budget}`,
    `Timeline: ${data.timeline}`,
    "",
    "What I want to build:",
    data.brief,
  ].join("\n");

  return `mailto:awesomeakokayo@gmail.com?subject=${encodeURIComponent("New qualified project enquiry")}&body=${encodeURIComponent(body)}`;
}

export default function LeadFunnel() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ type: "", budget: "", timeline: "", name: "", email: "", company: "", brief: "" });
  const [sent, setSent] = useState(false);

  const choose = (value) => {
    const key = steps[step].key;
    setData((current) => ({ ...current, [key]: value }));
    setStep((current) => current + 1);
  };

  const [sending, setSending] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (sending) return;
    setSending(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/awesomeakokayo@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          source: "awesomeakokayo.cv",
          leadType: "qualified-project",
          _subject: "New qualified project enquiry from awesomeakokayo.cv",
          _replyto: data.email,
          _template: "table",
          _honey: "",
          _url: window.location.href,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false) throw new Error("Submission failed");
      setSent(true);
    } catch (error) {
      window.location.href = buildMailto(data);
    } finally {
      setSending(false);
    }
  };
  const reset = () => {
    setStep(0);
    setSent(false);
    setData({ type: "", budget: "", timeline: "", name: "", email: "", company: "", brief: "" });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full bg-[#ff5c00] px-5 py-3.5 text-xs font-bold text-[#080808] shadow-[0_16px_50px_rgba(255,92,0,.28)] transition hover:-translate-y-1 hover:bg-[#ff7324] md:bottom-7 md:right-7"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        Start a project <ArrowRight className="h-4 w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-[#050505]/90 p-4 backdrop-blur-md sm:p-6" role="dialog" aria-modal="true" aria-label="Start a project">
          <div className="mx-auto my-4 max-w-2xl overflow-hidden rounded-[28px] border border-white/10 bg-[#10100f] shadow-2xl sm:my-10">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#ff5c00]" style={{fontFamily:"'Space Mono', monospace"}}>Project fit check</p>
                <p className="mt-1 text-xs text-[#73716a]">60 seconds. No sales call required to enquire.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close"><X className="h-5 w-5 text-[#9c9b94]" /></button>
            </div>

            <div className="p-6 sm:p-8">
              {sent ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ff5c00]/15"><Check className="h-7 w-7 text-[#ffb36b]" /></div>
                  <h2 className="mt-6 text-4xl leading-none text-[#f4f3ef]" style={{fontFamily:"'Ojuju', sans-serif"}}>You’re on my radar.</h2>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#b8b7b1]">I have the project context. I’ll review the fit and respond with the next step rather than sending you a generic sales reply.</p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <a href="mailto:awesomeakokayo@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs font-bold text-[#f4f3ef]" style={{fontFamily:"'Space Mono', monospace"}}><Mail className="h-4 w-4" /> Email directly</a>
                    <button type="button" onClick={() => { reset(); }} className="rounded-full bg-[#ff5c00] px-5 py-3 text-xs font-bold text-[#080808]" style={{fontFamily:"'Space Mono', monospace"}}>Start another</button>
                  </div>
                </div>
              ) : step < steps.length ? (
                <>
                  <div className="mb-8 flex gap-1.5">{steps.map((item, index) => <div key={item.key} className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-[#ff5c00]" : "bg-white/10"}`} />)}</div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#73716a]" style={{fontFamily:"'Space Mono', monospace"}}>Step {step + 1} of {steps.length}</p>
                  <h2 className="mt-4 text-4xl leading-[0.95] text-[#f4f3ef] sm:text-5xl" style={{fontFamily:"'Ojuju', sans-serif"}}>{steps[step].title}</h2>
                  <div className="mt-8 grid gap-3">
                    {steps[step].options.map(option => (
                      <button key={option} type="button" onClick={() => choose(option)} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#080808] px-5 py-4 text-left text-sm text-[#f4f3ef] transition hover:border-[#ff5c00]/50 hover:bg-[#15110d]">
                        <span>{option}</span><ArrowRight className="h-4 w-4 text-[#73716a] transition group-hover:translate-x-1 group-hover:text-[#ffb36b]" />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <form onSubmit={submit}>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#ff5c00]" style={{fontFamily:"'Space Mono', monospace"}}>Final step</p>
                  <h2 className="mt-4 text-4xl leading-[0.95] text-[#f4f3ef] sm:text-5xl" style={{fontFamily:"'Ojuju', sans-serif"}}>Give me enough context to make the first reply useful.</h2>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {[
                      ["name", "Your name", "text", true],
                      ["email", "Work email", "email", true],
                      ["company", "Company / organisation", "text", false],
                    ].map(([name, label, type, required]) => (
                      <label key={name} className="block">
                        <span className="text-[10px] uppercase tracking-[0.14em] text-[#73716a]" style={{fontFamily:"'Space Mono', monospace"}}>{label}</span>
                        <input required={required} type={type} value={data[name]} onChange={(e) => setData({...data, [name]: e.target.value})} className="mt-2 w-full rounded-xl border border-white/10 bg-[#080808] px-4 py-3 text-sm text-[#f4f3ef] outline-none focus:border-[#ff5c00]/60" />
                      </label>
                    ))}
                  </div>
                  <label className="mt-4 block">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#73716a]" style={{fontFamily:"'Space Mono', monospace"}}>What are you building?</span>
                    <textarea required rows="5" value={data.brief} onChange={(e) => setData({...data, brief:e.target.value})} className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#080808] px-4 py-3 text-sm leading-6 text-[#f4f3ef] outline-none focus:border-[#ff5c00]/60" placeholder="Who is it for, what problem does it solve, and what would make the project a success?" />
                  </label>
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="grid gap-3 text-xs text-[#b8b7b1] sm:grid-cols-3">
                      <span><strong className="text-[#f4f3ef]">Project:</strong> {data.type}</span>
                      <span><strong className="text-[#f4f3ef]">Budget:</strong> {data.budget}</span>
                      <span><strong className="text-[#f4f3ef]">Start:</strong> {data.timeline}</span>
                    </div>
                  </div>
                  <button type="submit" disabled={sending} className="mt-5 inline-flex w-full items-center justify-center gap-2 border-2 border-[#080808] bg-[#ff5c00] px-6 py-4 text-sm font-bold text-[#080808] shadow-[0_5px_0_#080808] disabled:cursor-not-allowed disabled:opacity-70" style={{fontFamily:"'Space Mono', monospace"}}>{sending ? "Sending…" : "Send project enquiry"} <ArrowRight className="h-4 w-4" /></button>
                  <div className="mt-4 flex items-center gap-2 text-[11px] leading-5 text-[#73716a]"><ShieldCheck className="h-4 w-4 shrink-0" /> Your details are used only to respond to this project enquiry.</div>
                </form>
              )}
            </div>

            {!sent && (
              <div className="border-t border-white/10 bg-[#0b0b0a] px-6 py-4 sm:px-8">
                <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.12em] text-[#73716a]" style={{fontFamily:"'Space Mono', monospace"}}>
                  <span>Typical projects from ₦500k</span>
                  <span className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5" /> Fit first · scope second</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
