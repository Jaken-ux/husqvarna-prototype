"use client";

import { useState, Fragment } from "react";
import NavHeader from "../NavHeader";
import { allFlows, flowsJsonExport, type TaskFlow, type FlowStep, type FieldDef } from "../taskFlowsData";

/* ═══════════════════════════════════════════════════════
   TASK FLOWS — 2026 Sellout & Customer Registration
   Interactive wireframes for all 7 core flows
   ═══════════════════════════════════════════════════════ */

const flowColors: Record<string, { bg: string; text: string; border: string }> = {
  identify_product: { bg: "#e3f2fd", text: "#1565c0", border: "#1565c0" },
  sellout: { bg: "#fff3e0", text: "#e65100", border: "#e65100" },
  installation: { bg: "#e8f5e9", text: "#2e7d32", border: "#2e7d32" },
  handover: { bg: "#f3e5f5", text: "#7b1fa2", border: "#7b1fa2" },
  warranty_start: { bg: "#e0f2f1", text: "#00695c", border: "#00695c" },
  service_contract: { bg: "#e8eaf6", text: "#283593", border: "#283593" },
  hypercare: { bg: "#fce8e8", text: "#c44", border: "#c44" },
};

const flowIcons: Record<string, string> = {
  identify_product: "M7 7a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM10.5 10.5L14 14",
  sellout: "M10 10a7 7 0 100-14 7 7 0 000 14zM7 10l2.5 2.5L13 7",
  installation: "M10 2l6 3v5c0 3.5-2.5 6.5-6 8-3.5-1.5-6-4.5-6-8V5l6-3z",
  handover: "M4 10l4 4 8-8",
  warranty_start: "M10 2l6 3v5c0 3.5-2.5 6.5-6 8-3.5-1.5-6-4.5-6-8V5l6-3zM7.5 10l2.5 2 3-4",
  service_contract: "M5 2h10a2 2 0 012 2v14l-3-2-3 2-3-2-3 2V4a2 2 0 012-2zM8 7h4M8 10h4",
  hypercare: "M3 10h2l2-4 3 8 2-4h5",
};

type ViewMode = "flows" | "journey" | "json";

export default function TaskFlowsPage() {
  const [activeFlow, setActiveFlow] = useState<string>("identify_product");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>("flows");

  const flow = allFlows.find((f) => f.id === activeFlow) ?? allFlows[0];
  const step = flow.steps[activeStep] ?? flow.steps[0];
  const colors = flowColors[flow.id] ?? flowColors.identify_product;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <NavHeader />

      <main className="mx-auto max-w-[1320px] px-6 py-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#111]">Task Flows</h1>
            <p className="mt-1 text-[13px] text-[#888]">2026 Sellout & Customer Registration — 7 kärnflöden</p>
          </div>
          <div className="flex gap-1 rounded-lg bg-[#f3f3f3] p-1">
            {(["flows", "journey", "json"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                className={`rounded-md px-3 py-1.5 text-[12px] font-semibold transition-all ${
                  viewMode === v ? "bg-white text-[#111] shadow-sm" : "text-[#888] hover:text-[#555]"
                }`}
              >
                {v === "flows" ? "Flöden" : v === "journey" ? "User Journey" : "JSON Export"}
              </button>
            ))}
          </div>
        </div>

        {viewMode === "flows" && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Left sidebar: flow selector */}
            <div className="space-y-1.5">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#999]">Välj flöde</p>
              {allFlows.map((f, i) => {
                const c = flowColors[f.id] ?? flowColors.identify_product;
                const isActive = f.id === activeFlow;
                return (
                  <button
                    key={f.id}
                    onClick={() => { setActiveFlow(f.id); setActiveStep(0); }}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                      isActive
                        ? "border-2 bg-white shadow-sm"
                        : "border-2 border-transparent hover:bg-white hover:shadow-sm"
                    }`}
                    style={isActive ? { borderColor: c.border } : undefined}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: c.bg }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={c.text} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d={flowIcons[f.id] ?? ""} />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <span className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-[#aaa]">{String.fromCharCode(65 + i)}</span>
                        <span className={`text-[13px] font-semibold ${isActive ? "text-[#111]" : "text-[#555]"}`}>{f.title}</span>
                      </span>
                      <span className="block truncate text-[11px] text-[#888]">{f.steps.length} steg</span>
                    </div>
                    {f.bulkSupport && (
                      <span className="ml-auto shrink-0 rounded bg-[#fff3e0] px-1.5 py-0.5 text-[9px] font-bold text-[#e65100]">BULK</span>
                    )}
                  </button>
                );
              })}

              {/* Journey sequence */}
              <div className="mt-4 rounded-xl border border-dashed border-[#d0d0d0] bg-white p-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">Journey-sekvens</p>
                <div className="mt-2 flex flex-col gap-1">
                  {allFlows.map((f, i) => (
                    <div key={f.id} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: flowColors[f.id]?.border ?? "#888" }} />
                      <span className="text-[11px] text-[#555]">{f.title}</span>
                      {i < allFlows.length - 1 && (
                        <svg className="ml-auto text-[#ccc]" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 2v6M3 6l2 2 2-2" /></svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: flow detail */}
            <div className="space-y-6">
              {/* Flow header */}
              <div className="rounded-xl border-2 bg-white p-6" style={{ borderColor: colors.border }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: colors.bg }}>
                      <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke={colors.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={flowIcons[flow.id] ?? ""} />
                      </svg>
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-[#111]">{flow.title}</h2>
                      <p className="text-[13px] text-[#888]">{flow.subtitle}</p>
                    </div>
                  </div>
                  {flow.bulkSupport && (
                    <span className="rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ backgroundColor: colors.bg, color: colors.text }}>
                      Bulk-stöd
                    </span>
                  )}
                </div>

                {/* Entry points */}
                <div className="mt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">Entry points</p>
                  <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                    {flow.entryPoints.map((ep) => (
                      <li key={ep} className="flex items-start gap-2 text-[12px] text-[#555]">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colors.border }} />
                        {ep}
                      </li>
                    ))}
                  </ul>
                </div>

                {flow.mobileVariant && (
                  <div className="mt-4 rounded-lg border border-[#e5e5e5] bg-[#f8f9fb] px-4 py-3">
                    <p className="text-[11px] font-semibold text-[#555]">Mobilvariant</p>
                    <p className="mt-0.5 text-[12px] text-[#888]">{flow.mobileVariant}</p>
                  </div>
                )}
              </div>

              {/* Step selector */}
              <div className="flex items-center gap-2 overflow-x-auto">
                {flow.steps.map((s, i) => (
                  <Fragment key={s.id}>
                    <button
                      onClick={() => setActiveStep(i)}
                      className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-semibold transition-all ${
                        i === activeStep
                          ? "bg-white shadow-sm border-2"
                          : "text-[#888] hover:bg-white hover:text-[#555]"
                      }`}
                      style={i === activeStep ? { borderColor: colors.border, color: colors.text } : undefined}
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: i === activeStep ? colors.border : "#ccc" }}>
                        {i + 1}
                      </span>
                      {s.title.replace(/^Steg \d+ — /, "")}
                    </button>
                    {i < flow.steps.length - 1 && (
                      <svg className="shrink-0 text-[#ccc]" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 4l4 4-4 4" /></svg>
                    )}
                  </Fragment>
                ))}
              </div>

              {/* Active step detail */}
              <StepWireframe step={step} colors={colors} />

              {/* Transitions */}
              {flow.transitions.length > 0 && (
                <div className="rounded-xl border border-[#d0d0d0] bg-white p-5">
                  <h3 className="text-[13px] font-semibold text-[#111]">Transitions — vad händer efter?</h3>
                  <div className="mt-3 space-y-2">
                    {flow.transitions.map((t, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg border border-[#e5e5e5] px-4 py-2.5">
                        <code className="rounded bg-[#f0f3f8] px-2 py-0.5 text-[10px] font-mono text-[#273A60]">{t.from}</code>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round"><path d="M4 8h8M9 5l3 3-3 3" /></svg>
                        <code className="rounded bg-[#f0f3f8] px-2 py-0.5 text-[10px] font-mono text-[#273A60]">{t.to}</code>
                        <span className="ml-2 text-[12px] font-medium text-[#555]">{t.label}</span>
                        {t.condition && (
                          <span className="ml-auto rounded-full bg-[#fff8e1] px-2 py-0.5 text-[10px] font-semibold text-[#b8860b]">
                            om: {t.condition}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {viewMode === "journey" && <JourneyView />}
        {viewMode === "json" && <JsonView />}
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STEP WIREFRAME COMPONENT
   ═══════════════════════════════════════════════════════ */

function StepWireframe({ step, colors }: { step: FlowStep; colors: { bg: string; text: string; border: string } }) {
  return (
    <div className="rounded-xl border border-[#d0d0d0] bg-white">
      {/* Step header */}
      <div className="border-b border-[#e5e5e5] px-6 py-4">
        <h3 className="text-[15px] font-bold text-[#111]">{step.title}</h3>
        <p className="mt-0.5 text-[13px] text-[#888]">{step.subtitle}</p>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[1fr_280px]">
        {/* Left: Form / Content wireframe */}
        <div className="space-y-5">
          {step.fields.length > 0 ? (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">Fält</p>
              {step.fields.map((field) => (
                <FieldWireframe key={field.name} field={field} colors={colors} />
              ))}
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-[#d0d0d0] bg-[#fafafa] p-6 text-center">
              <p className="text-[13px] font-semibold text-[#555]">Sammanfattningskort</p>
              <p className="mt-1 text-[12px] text-[#888]">Alla inmatade värden visas som readonly-kort med möjlighet att gå tillbaka och ändra.</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 border-t border-[#e5e5e5] pt-4">
            {step.actions.map((action) => (
              <span
                key={action.label}
                className={`rounded-lg px-4 py-2.5 text-[12px] font-semibold ${
                  action.type === "primary"
                    ? "text-white"
                    : action.type === "secondary"
                    ? "border border-[#d0d0d0] bg-white text-[#555]"
                    : "text-[#273A60] underline"
                }`}
                style={action.type === "primary" ? { backgroundColor: colors.border } : undefined}
              >
                {action.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right: States & Notes */}
        <div className="space-y-4">
          {/* States */}
          <div className="rounded-lg border border-[#e5e5e5] bg-[#f8f9fb] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">States</p>
            <ul className="mt-2 space-y-2">
              {step.states.empty && (
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#bbb]" />
                  <div>
                    <span className="text-[10px] font-bold text-[#888]">EMPTY</span>
                    <p className="text-[11px] text-[#555]">{step.states.empty}</p>
                  </div>
                </li>
              )}
              {step.states.loading && (
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#1565c0]" />
                  <div>
                    <span className="text-[10px] font-bold text-[#1565c0]">LOADING</span>
                    <p className="text-[11px] text-[#555]">{step.states.loading}</p>
                  </div>
                </li>
              )}
              {step.states.error && (
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#c44]" />
                  <div>
                    <span className="text-[10px] font-bold text-[#c44]">ERROR</span>
                    <p className="text-[11px] text-[#555]">{step.states.error}</p>
                  </div>
                </li>
              )}
              {step.states.success && (
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#2a9d5c]" />
                  <div>
                    <span className="text-[10px] font-bold text-[#2a9d5c]">SUCCESS</span>
                    <p className="text-[11px] text-[#555]">{step.states.success}</p>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Notes */}
          {step.notes && step.notes.length > 0 && (
            <div className="rounded-lg border border-[#e5e5e5] bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">Design-notes</p>
              <ul className="mt-2 space-y-1.5">
                {step.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] text-[#555]">
                    <span className="mt-0.5 shrink-0 text-[10px] text-[#bbb]">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FIELD WIREFRAME COMPONENT
   ═══════════════════════════════════════════════════════ */

function FieldWireframe({ field, colors }: { field: FieldDef; colors: { bg: string; text: string; border: string } }) {
  return (
    <div className="rounded-lg border border-[#e5e5e5] bg-white p-4">
      <div className="flex items-center gap-2">
        <span className="text-[12px] font-semibold text-[#111]">{field.label}</span>
        {field.required && <span className="text-[10px] font-bold text-[#c44]">Krävs</span>}
        <span className="ml-auto rounded bg-[#f0f3f8] px-1.5 py-0.5 text-[9px] font-mono text-[#888]">{field.type}</span>
      </div>

      {/* Wireframe input */}
      <div className="mt-2">
        {field.type === "radio" && field.options ? (
          <div className="flex flex-wrap gap-2">
            {field.options.map((opt, i) => (
              <span key={opt} className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${
                i === 0 ? "border-2 bg-white" : "border-[#d0d0d0] text-[#888]"
              }`} style={i === 0 ? { borderColor: colors.border, color: colors.text } : undefined}>
                {opt}
              </span>
            ))}
          </div>
        ) : field.type === "checkbox" && field.options ? (
          <div className="space-y-1.5">
            {field.options.map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-[12px] text-[#555]">
                <span className="h-4 w-4 rounded border border-[#ccc] bg-white" />
                {opt}
              </label>
            ))}
          </div>
        ) : field.type === "checkbox" ? (
          <label className="flex items-center gap-2 text-[12px] text-[#555]">
            <span className="h-4 w-4 rounded border border-[#ccc] bg-white" />
            {field.label}
          </label>
        ) : field.type === "textarea" ? (
          <div className="h-16 w-full rounded-lg border border-[#d0d0d0] bg-[#f8f8f8] px-3 py-2 text-[12px] text-[#aaa]">
            {field.placeholder ?? ""}
          </div>
        ) : field.type === "select" ? (
          <div className="flex h-9 w-full items-center justify-between rounded-lg border border-[#d0d0d0] bg-white px-3 text-[12px] text-[#aaa]">
            <span>{field.options?.[0] ?? "Välj..."}</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 4l2 2 2-2" /></svg>
          </div>
        ) : field.type === "file" ? (
          <div className="flex h-16 items-center justify-center rounded-lg border-2 border-dashed border-[#d0d0d0] bg-[#fafafa] text-[12px] text-[#888]">
            Dra filer hit eller klicka för att ladda upp
          </div>
        ) : (
          <div className="flex h-9 w-full items-center rounded-lg border border-[#d0d0d0] bg-[#f8f8f8] px-3 text-[12px] text-[#aaa]">
            {field.prefill ? (
              <span className="text-[#555]">{field.prefill}</span>
            ) : (
              field.placeholder ?? ""
            )}
          </div>
        )}
      </div>

      {/* Helper */}
      {field.helper && (
        <p className="mt-1.5 text-[11px] text-[#888]">{field.helper}</p>
      )}

      {/* Validation */}
      {field.validation && (
        <p className="mt-1 text-[10px] text-[#aaa]">
          <span className="font-semibold">Validering:</span> {field.validation}
        </p>
      )}

      {/* Error message */}
      {field.errorMsg && (
        <p className="mt-1 text-[10px] text-[#c44]">
          <span className="font-semibold">Felmeddelande:</span> {field.errorMsg}
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   JOURNEY VIEW — visual flow map
   ═══════════════════════════════════════════════════════ */

function JourneyView() {
  return (
    <div className="mt-6 space-y-8">
      <div>
        <h2 className="text-base font-semibold text-[#111]">User Journey — Identify → Sellout → Install → Handover → Warranty → Contract → HyperCare</h2>
        <p className="mt-1 text-[12px] text-[#888]">Visar hela kedjan, steg-för-steg, med entry points och transitions</p>
      </div>

      {/* Horizontal journey */}
      <div className="overflow-x-auto">
        <div className="flex items-start gap-4 min-w-[1100px]">
          {allFlows.map((flow, i) => {
            const c = flowColors[flow.id] ?? flowColors.identify_product;
            return (
              <Fragment key={flow.id}>
                <div className="w-40 shrink-0">
                  {/* Flow card */}
                  <div className="rounded-xl border-2 bg-white p-4" style={{ borderColor: c.border }}>
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: c.bg }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={c.text} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d={flowIcons[flow.id] ?? ""} />
                        </svg>
                      </span>
                      <span className="text-[10px] font-bold" style={{ color: c.text }}>{String.fromCharCode(65 + i)}</span>
                    </div>
                    <h3 className="mt-2 text-[12px] font-bold text-[#111]">{flow.title}</h3>
                    <p className="mt-0.5 text-[10px] text-[#888]">{flow.steps.length} steg</p>

                    {/* Steps list */}
                    <div className="mt-3 space-y-1">
                      {flow.steps.map((s, j) => (
                        <div key={s.id} className="flex items-center gap-1.5">
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white" style={{ backgroundColor: c.border }}>
                            {j + 1}
                          </span>
                          <span className="truncate text-[10px] text-[#555]">{s.title.replace(/^Steg \d+ — /, "").replace(/^HyperCare-/, "")}</span>
                        </div>
                      ))}
                    </div>

                    {/* Transitions out */}
                    {flow.transitions.length > 0 && (
                      <div className="mt-3 border-t border-[#e5e5e5] pt-2">
                        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#bbb]">Leads to</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {flow.transitions.map((t) => (
                            <span key={t.to} className="rounded bg-[#f0f0f0] px-1.5 py-0.5 text-[9px] font-medium text-[#888]">{t.to}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                {i < allFlows.length - 1 && (
                  <div className="flex shrink-0 items-center self-center">
                    <svg width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M0 8h24M20 4l4 4-4 4" />
                    </svg>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>

      {/* Summary table */}
      <div className="rounded-xl border border-[#d0d0d0] bg-white overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Flöde</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Steg</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Obligatoriska fält</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Valfria fält</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Entry points</th>
              <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#999]">Bulk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {allFlows.map((f) => {
              const reqFields = f.steps.flatMap((s) => s.fields.filter((fd) => fd.required));
              const optFields = f.steps.flatMap((s) => s.fields.filter((fd) => !fd.required));
              return (
                <tr key={f.id} className="hover:bg-[#fafafa]">
                  <td className="px-5 py-3">
                    <span className="text-[13px] font-semibold" style={{ color: flowColors[f.id]?.text }}>{f.title}</span>
                  </td>
                  <td className="px-3 py-3 text-center text-[13px] font-bold text-[#111]">{f.steps.length}</td>
                  <td className="px-3 py-3 text-center text-[13px] font-bold text-[#111]">{reqFields.length}</td>
                  <td className="px-3 py-3 text-center text-[13px] text-[#888]">{optFields.length}</td>
                  <td className="px-3 py-3 text-center text-[13px] text-[#888]">{f.entryPoints.length}</td>
                  <td className="px-3 py-3 text-center">
                    {f.bulkSupport ? (
                      <span className="rounded-full bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-semibold text-[#2e7d32]">Ja</span>
                    ) : (
                      <span className="text-[12px] text-[#ccc]">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Field inventory */}
      <div className="rounded-xl border border-[#d0d0d0] bg-white p-5">
        <h3 className="text-[13px] font-semibold text-[#111]">Alla unika fält — inventering</h3>
        <p className="mt-0.5 text-[12px] text-[#888]">Fält som återanvänds ska ha samma komponent, label och validering överallt</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {(() => {
            const seen = new Set<string>();
            const unique: { name: string; label: string; type: string; flows: string[] }[] = [];
            allFlows.forEach((f) => {
              f.steps.forEach((s) => {
                s.fields.forEach((fd) => {
                  if (!seen.has(fd.name)) {
                    seen.add(fd.name);
                    unique.push({ name: fd.name, label: fd.label, type: fd.type, flows: [f.title] });
                  } else {
                    const existing = unique.find((u) => u.name === fd.name);
                    if (existing && !existing.flows.includes(f.title)) {
                      existing.flows.push(f.title);
                    }
                  }
                });
              });
            });
            return unique.map((u) => (
              <div key={u.name} className="rounded-lg border border-[#e5e5e5] px-3 py-2">
                <span className="text-[12px] font-semibold text-[#111]">{u.label}</span>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <code className="rounded bg-[#f0f3f8] px-1 py-0.5 text-[9px] font-mono text-[#888]">{u.type}</code>
                  {u.flows.length > 1 && (
                    <span className="rounded bg-[#fff8e1] px-1 py-0.5 text-[9px] font-bold text-[#b8860b]">×{u.flows.length}</span>
                  )}
                </div>
              </div>
            ));
          })()}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   JSON VIEW — exportable spec
   ═══════════════════════════════════════════════════════ */

function JsonView() {
  return (
    <div className="mt-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-[#111]">JSON Export — teknisk spec</h2>
        <p className="mt-1 text-[12px] text-[#888]">Komplett flödesstruktur för utveckling och Figma-integration</p>
      </div>

      <div className="rounded-xl border border-[#d0d0d0] bg-white overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] bg-[#fafafa] px-5 py-3">
          <code className="text-[12px] font-mono text-[#273A60]">taskFlowsSpec.json</code>
          <button
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(flowsJsonExport, null, 2));
            }}
            className="rounded-lg border border-[#d0d0d0] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]"
          >
            Kopiera JSON
          </button>
        </div>
        <pre className="max-h-[600px] overflow-auto p-5 text-[11px] font-mono text-[#555] leading-relaxed">
          {JSON.stringify(flowsJsonExport, null, 2)}
        </pre>
      </div>
    </div>
  );
}
