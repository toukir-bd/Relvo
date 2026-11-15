
"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    question: "What services does Relvo provide?",
    answer:
      "We bring strategy, design, and development together across UI/UX, websites, e-commerce, custom software, branding, and motion. We can support a focused part of a project or take it from the first idea through launch.",
  },
  {
    question: "How do we get started on a project?",
    answer:
      "Share a little about your goals using the contact form. We’ll arrange an initial conversation to understand your needs, answer questions, and agree on the best next step.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Pricing depends on the project scope, complexity, and timeline. After learning what you need, we’ll outline the work and provide a clear estimate before anything begins.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary by scope. A smaller design engagement may take a few weeks, while a larger website or software build can take longer. We’ll agree on milestones and a realistic schedule together.",
  },
  {
    question: "Can you work with our existing team or product?",
    answer:
      "Yes. We can collaborate with your in-house team, work within an existing design system, or improve an established website or product. We’ll adapt our process to fit your setup.",
  },
  {
    question: "Will we be involved while the work is being made?",
    answer:
      "Absolutely. We share progress at agreed milestones, gather your feedback, and keep decisions and next steps clear throughout the project.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section aria-labelledby="faq-title" className="relative isolate overflow-hidden px-5 pt-10 pb-32 text-white sm:px-8 sm:pt-24 sm:pb-40 lg:px-16 lg:pt-30 lg:pb-48">
      <div className="inset-0 -z-1 absolute flex w-full flex-col items-center justify-center overflow-hidden px-6 py-8 md:px-[7vw]"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(187 255 0 / 4%) 0.65px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[min(70vw,780px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mx-auto mb-5 max-w-3xl text-center sm:mb-8 lg:mb-10">
          <h2 id="faq-title" className="focus-title whitespace-nowrap text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-normal text-white">
            <span className="hero-text-neon">clarity starts here</span>
          </h2>
          <p className="text-center text-[clamp(20px,2vw,29px)] font-[300] tracking-wide">
            Answered the questions those clients ask most often.
          </p>
        </header>
        <div className="space-y-3">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            const questionId = `faq-question-${index}`;
            const answerId = `faq-answer-${index}`;
            return (
              <article key={item.question} className={`group rounded-2xl border bg-primary/7 transition-all duration-300 hover:bg-primary/10 sm:rounded-[22px] ${isOpen ? "bg-primary/7 border-primary/30 hover:border-primary/30" : "border-transparent hover:border-primary/30"}`}>
                <h3>
                  <button
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-5 px-5 py-5 text-left sm:px-7 sm:py-6 lg:px-9"
                  >
                    <span className={`text-base font-[400] leading-snug sm:text-lg lg:text-[27px] ${isOpen ? "text-primary group-hover:text-primary" : "text-white/70 group-hover:text-white"}`}>{item.question}</span>
                    <span aria-hidden="true" className={`grid size-9 shrink-0 place-items-center rounded-full bg-primary/[0.08] text-primary transition duration-300 sm:size-10 ${isOpen ? "rotate-45 bg-primary text-secondary" : ""}`}>
                      <Plus size={20} strokeWidth={2.2} />
                    </span>
                  </button>
                </h3>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className={`mx-5 max-w-6xl border-t border-white/[0.08] pb-6 pt-4 text-sm font-[400] leading-5 text-white transition-opacity sm:mx-7 sm:pb-7 sm:text-[19px] tracking-wider sm:leading-8 lg:mx-9 ${isOpen ? "opacity-100" : "opacity-0"}`}>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
