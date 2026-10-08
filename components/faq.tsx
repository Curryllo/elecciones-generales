"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";
import { FAQ } from "@/lib/faq";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="preguntas" className="scroll-mt-24 border-t border-line bg-surface">
      <div className="container-page py-16 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted">
            Dudas habituales sobre el 29 de noviembre, resueltas con la ley
            electoral en la mano.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="border-t border-line">
            {FAQ.map((item, index) => {
              const isOpen = openIndex === index + 1;
              return (
                <div key={item.question} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index + 1)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  >
                    <span className="text-base font-medium tracking-tight sm:text-lg">
                      {item.question}
                    </span>
                    <CaretDown
                      size={18}
                      weight="bold"
                      className={`shrink-0 text-muted transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-200 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-8 text-sm leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
