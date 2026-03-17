"use client";

import { useEffect, useRef, useState } from "react";
import {
  initialMessages,
  fakeAiResponses,
  type ChatMessage,
} from "./aiChatData";

type Props = {
  onClose: () => void;
};

export default function AiPartsFinderModal({ onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [responseIndex, setResponseIndex] = useState(0);

  // Lock scroll, focus input, ESC to close
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => inputRef.current?.focus(), 100);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { role: "user", text: trimmed };
    const aiText =
      fakeAiResponses[responseIndex % fakeAiResponses.length];
    const aiMsg: ChatMessage = { role: "ai", text: aiText };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
    setResponseIndex((prev) => prev + 1);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 animate-fade-in motion-reduce:animate-none"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-label="AI-assisterad reservdelssök"
        aria-modal="true"
        className="relative z-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-2xl animate-panel-in motion-reduce:animate-none"
        style={{ maxHeight: "min(85vh, 680px)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#f0f0f0] px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-[#111]">
                AI-assisterad reservdelssök
              </h2>
              <span className="rounded bg-[#e8ecf4] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#273A60]">
                Preview
              </span>
            </div>
            <p className="mt-1 text-sm text-[#888]">
              Få hjälp även om du inte har artikelnummer. Vi guidar dig via
              modell &rarr; sprängskiss &rarr; del.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Stäng"
            className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#999] transition-colors hover:bg-[#f5f5f5] hover:text-[#333]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        {/* Chat area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-[#111] text-white"
                      : "rounded-bl-md bg-[#f5f5f5] text-[#333]"
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Part matches */}
                  {msg.parts && (
                    <ul className="mt-3 space-y-2">
                      {msg.parts.map((part, j) => (
                        <li
                          key={j}
                          className="flex items-center justify-between gap-3 rounded-lg border border-[#e0e0e0] bg-white px-3 py-2"
                        >
                          <span className="text-[13px] font-medium text-[#222]">
                            {part.name}
                          </span>
                          <div className="flex gap-1.5">
                            <a
                              href={part.action}
                              className="whitespace-nowrap rounded-md bg-[#f5f5f5] px-2.5 py-1 text-[11px] font-medium text-[#555] transition-colors hover:bg-[#eee]"
                            >
                              Öppna sprängskiss
                            </a>
                            <a
                              href={part.action}
                              className="whitespace-nowrap rounded-md bg-[#111] px-2.5 py-1 text-[11px] font-medium text-white transition-opacity hover:opacity-80"
                            >
                              Se del
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input bar */}
        <div className="border-t border-[#f0f0f0] px-6 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Skriv t.ex. 'Jag har en Automower 315X och behöver nytt knivblad'..."
              aria-label="Meddelande till AI-assistenten"
              className="h-10 flex-1 rounded-lg border border-[#e0e0e0] bg-[#fafafa] px-4 text-sm text-[#333] placeholder-[#aaa] transition-colors focus:border-[#bbb] focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="h-10 rounded-lg bg-[#111] px-5 text-sm font-medium text-white transition-opacity hover:opacity-80"
            >
              Skicka
            </button>
          </form>

          {/* Disclaimer */}
          <p className="mt-3 text-center text-[11px] text-[#bbb]">
            Demo: AI-sök är en prototyp i denna testsida.
          </p>
        </div>
      </div>
    </div>
  );
}
