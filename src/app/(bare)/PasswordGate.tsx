"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "bare-auth";
const PASSWORD = "supersecret";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
      setInput("");
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-[#e0e0e0] bg-white p-8 shadow-lg"
      >
        <h1 className="text-lg font-bold text-[#111]">Skyddad sida</h1>
        <p className="mt-1 text-[13px] text-[#888]">Ange lösenord för att fortsätta</p>
        <input
          type="password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false); }}
          placeholder="Lösenord"
          autoFocus
          className={`mt-4 h-11 w-full rounded-lg border px-4 text-[14px] outline-none transition-colors focus:border-[#273A60] focus:ring-2 focus:ring-[#273A60]/20 ${
            error ? "border-red-400 bg-red-50" : "border-[#d0d0d0] bg-white"
          }`}
        />
        {error && (
          <p className="mt-2 text-[12px] text-red-500">Fel lösenord, försök igen</p>
        )}
        <button
          type="submit"
          className="mt-4 h-11 w-full rounded-lg bg-[#273A60] text-[14px] font-semibold text-white transition-colors hover:bg-[#1e2e4a]"
        >
          Logga in
        </button>
      </form>
    </div>
  );
}
