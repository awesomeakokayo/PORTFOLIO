import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, Brain, Check, Menu, Rocket, Smartphone, X } from "lucide-react";
import ProjectShowcase from "./ProjectShowcase.jsx";

const display = { fontFamily: "'Ojuju', sans-serif" };
const mono = { fontFamily: "'Space Mono', monospace" };
const body = { fontFamily: "'Inter', sans-serif" };

const services = [
  { icon: Smartphone, title: "Web & mobile products", text: "Websites, SaaS products, dashboards and mobile apps built around the people who will actually use them." },
  { icon: Brain, title: "AI-powered products", text: "AI features that solve a real problem — from intelligent assistants and recommendations to analysis and automation." },
  { icon: Rocket, title: "Idea → working product", text: "I help turn rough ideas into a practical product, then take it through design, engineering, testing and launch." },
];

const process = [
  ["01", "Understand", "We clarify the problem, users and desired outcome before jumping into implementation."],
  ["02", "Shape", "I turn the idea into a practical direction, user flows and a clear build plan."],
  ["03", "Build", "I handle the product experience and the engineering behind it, including AI where it adds value."],
  ["04", "Refine", "We improve the product around feedback and real usage instead of guessing."],
  ["05", "Launch", "The goal is a product you can confidently put in front of real people."],
];

function Eyebrow({ number, children }) {
  return <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[#ff5c00]" style={mono}><span>{number}</span><span className="text-white/20">/</span><span>{children}</span></p>;
}

function Nav({ open, setOpen }) {
  const links = [["Work", "#work"], ["How I Help", "#services"], ["About", "#about"]];
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080808]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-7 lg:h-[76px] lg:px-10 xl:px-16">
        <a href="#top" className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff5c00] text-sm font-black text-[#080808]" style={display}>A</span><span className="hidden text-sm sm:block" style={display}>Awesome Akokayo</span></a>
        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.18em] md:flex" style={mono}>{links.map(([label, href]) => <a key={label} href={href} className="text-[#9c9b94] transition hover:text-white">{label}</a>)}</nav>
        <a href="#contact" className="hidden rounded-full bg-[#ff5c00] px-5 py-2.5 text-xs font-bold text-[#080808] md:inline-flex" style={mono}>Let’s talk</a>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t border-white/10 px-5 py-5 md:hidden"><div className="flex flex-col gap-5 text-xs uppercase tracking-[0.18em]" style={mono}>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className="text-[#9c9b94] hover:text-white">{label}</a>)}<a href="#contact" onClick={() => setOpen(false)} className="rounded-full bg-[#ff5c00] px-5 py-3 text-center text-[#080808]">Let’s talk</a></div></div>}
    </header>
  );
}

export default function PortfolioSiteClean() {
  const [open, setOpen] = useState(false);
  return (
    <div id="top" className="min-h-screen bg-[#080808] text-[#f4f3ef]" style={body}>
      <Nav open={open} setOpen={setOpen} />
      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_10%_0%,rgba(255,92,0,.12),transparent_65%)]" />
          <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-7 md:pb-28 md:pt-24 lg:px-10 xl:px-16">
            <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_.75fr] lg:gap-20">
              <div>
                <Eyebrow number="00">Software engineer · AI builder · Product thinker</Eyebrow>
                <h1 className="mt-7 max-w-5xl text-[3.3rem] font-semibold leading-[0.94] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[6.7rem]" style={display}>I turn ideas into products people can <span className="text-[#ff5c00]">actually use.</span></h1>
                <p className="mt-7 max-w-2xl text-base leading-7 text-[#b8b7b1] md:text-lg md:leading-8">I design, build and ship web, mobile and AI-powered products — from the first conversation through to deployment.</p>
                <div className="mt-9 flex flex-wrap gap-3"><a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[#ff5c00] px-6 py-3.5 text-sm font-bold text-[#080808]" style={mono}>Work with me <ArrowRight className="h-4 w-4" /></a><a href="#work" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-bold" style={mono}>See selected work <ArrowRight className="h-4 w-4" /></a></div>
              </div>
              <div className="lg:pb-2"><div className="border-l border-[#ff5c00]/60 pl-5 text-sm leading-7 text-[#f4f3ef]">You do not need to speak developer to work with me. Bring the problem, the idea, or the rough sketch. I can help turn it into something concrete.</div><div className="mt-8 flex flex-wrap gap-2">{["Web","Mobile","AI","Backend","Product"].map(item => <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-[#b8b7b1]" style={mono}>{item}</span>)}</div></div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10"><div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0 lg:px-10 xl:px-16">{[["5+","products shipped"],["18","learning tracks built"],["01","Springer presentation"],["NG →","global / remote-ready"]].map(([value,label])=><div key={label} className="px-5 py-7 sm:px-7 lg:py-9"><div className="text-3xl sm:text-4xl" style={display}>{value}</div><div className="mt-1 text-xs text-[#9c9b94]" style={mono}>{label}</div></div>)}</div></section>

        <section id="work" className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 md:py-28 lg:px-10 xl:px-16"><Eyebrow number="01">Selected work</Eyebrow><div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end"><h2 className="max-w-3xl text-4xl leading-[0.96] sm:text-5xl md:text-6xl" style={display}>The work is the proof.</h2><p className="max-w-md text-sm leading-6 text-[#b8b7b1]">A few products that show how I think, what I build, and the problems I enjoy solving.</p></div><div className="mt-12"><ProjectShowcase /></div></div></section>

        <section id="services" className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 md:py-28 lg:px-10 xl:px-16"><Eyebrow number="02">How I help</Eyebrow><h2 className="mt-5 max-w-4xl text-4xl leading-[0.96] sm:text-5xl md:text-6xl" style={display}>You bring the problem. I help figure out the product.</h2><div className="mt-12 grid gap-4 md:grid-cols-3">{services.map(({icon:Icon,title,text})=><div key={title} className="rounded-[20px] border border-white/10 bg-[#10100f] p-7 transition hover:border-[#ff5c00]/40 hover:bg-[#121210]"><Icon className="h-6 w-6 text-[#ff5c00]"/><h3 className="mt-7 text-xl" style={display}>{title}</h3><p className="mt-4 text-sm leading-6 text-[#b8b7b1]">{text}</p></div>)}</div></div></section>

        <section className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 md:py-28 lg:px-10 xl:px-16"><Eyebrow number="03">The process</Eyebrow><div className="mt-7 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"><h2 className="text-4xl leading-[0.96] sm:text-5xl" style={display}>From conversation to launch.</h2><div className="divide-y divide-white/10">{process.map(([number,title,text])=><div key={number} className="grid gap-4 py-7 sm:grid-cols-[70px_170px_1fr]"><span className="text-xs text-[#ff5c00]" style={mono}>{number}</span><h3 className="text-xl" style={display}>{title}</h3><p className="text-sm leading-6 text-[#b8b7b1]">{text}</p></div>)}</div></div></div></section>

        <section id="about" className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 md:py-28 lg:px-10 xl:px-16"><div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24"><div><Eyebrow number="04">About Awesome</Eyebrow><h2 className="mt-5 text-4xl leading-[0.96] sm:text-5xl md:text-6xl" style={display}>I care about what gets built — not just what gets coded.</h2></div><div className="text-base leading-8 text-[#f4f3ef]"><p>I'm Awesome, a software engineer and product builder from Nigeria. I enjoy taking ideas that are still messy, unclear or sitting in someone's head and turning them into products that people can actually use.</p><p className="mt-6 text-[#e3e1db]">I work across product thinking, interface design, engineering, AI integration and deployment, so I can stay close to the problem from the first conversation through to the finished product.</p><div className="mt-8 space-y-3">{["Founder — EmoHabit, TechSkillHub, NaviPro","Computer Science graduate — Coal City University","Former NACOS Vice President II","Presented original research at Springer ETMiS 2025"].map(item=><div key={item} className="flex items-start gap-3 text-sm text-[#f4f3ef]"><Check className="mt-1 h-4 w-4 shrink-0 text-[#ff5c00]"/><span>{item}</span></div>)}</div></div></div></div></section>

        <section id="contact" className="relative overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(700px_400px_at_50%_20%,rgba(255,92,0,.14),transparent_65%)]"/><div className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:px-7 md:py-32 lg:px-10 xl:px-16"><Eyebrow number="05">Let's build</Eyebrow><h2 className="mx-auto mt-5 max-w-4xl text-5xl leading-[0.92] sm:text-6xl md:text-7xl" style={display}>Have something you're trying to build?</h2><p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#b8b7b1]">It does not need to be fully figured out. Start with the problem. We can work out the product from there.</p><a href="mailto:awesomeakokayo@gmail.com" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#ff5c00] px-7 py-4 text-sm font-bold text-[#080808]" style={mono}>Start the conversation <ArrowUpRight className="h-4 w-4"/></a></div></section>
      </main>
      <footer className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10 xl:px-16"><span className="text-sm" style={display}>Awesome Akokayo</span><span className="text-[10px] uppercase tracking-[0.16em] text-[#9c9b94]" style={mono}>Built in Nigeria · Shipping worldwide</span></div></footer>
    </div>
  );
}
