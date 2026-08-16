"use client";

import { useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { Eyebrow, Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type Mode = "payments" | "rag" | "reliability";

const modes: { id: Mode; label: string }[] = [
  { id: "payments", label: "Event-driven payments" },
  { id: "rag", label: "RAG knowledge search" },
  { id: "reliability", label: "Reliable integration" },
];

const questions = [
  {
    id: "payout",
    label: "How is a duplicate payout ignored?",
    chunks: [
      { id: "KB-12", text: "Consumers store the event key before any business write.", hit: true },
      { id: "KB-04", text: "A second delivery with the same key returns the first result.", hit: true },
      { id: "KB-19", text: "Retention for sample tickets is 24 months.", hit: false },
    ],
    answer:
      "The consumer records the idempotency key first. A redelivery finds that record and does not create a second payout.",
    cites: "KB-12, KB-04",
  },
  {
    id: "retain",
    label: "How long are sample tickets kept?",
    chunks: [
      { id: "KB-19", text: "Sample policy: support tickets are kept 24 months, then archived.", hit: true },
      { id: "KB-02", text: "Archive is not the same store as the live queue.", hit: true },
      { id: "KB-12", text: "Consumers store the event key before any business write.", hit: false },
    ],
    answer:
      "Under the sample policy, tickets stay for 24 months and then move to archive.",
    cites: "KB-19, KB-02",
  },
  {
    id: "lab",
    label: "What happens after a failed sample run?",
    chunks: [
      { id: "KB-07", text: "A failed sample run is marked Needs review.", hit: true },
      { id: "KB-08", text: "An operator can redrive it. The attempt is recorded.", hit: true },
      { id: "KB-04", text: "A second delivery with the same key returns the first result.", hit: false },
    ],
    answer:
      "The sample procedure marks the run Needs review. An operator can redrive it, and that attempt stays in the history.",
    cites: "KB-07, KB-08",
  },
] as const;

type LogLine = { id: number; text: string };

export function Playground() {
  const [mode, setMode] = useState<Mode>("payments");

  return (
    <Section label="Interactive demos">
      <div className="reveal max-w-3xl">
        <Eyebrow>Under the hood</Eyebrow>
        <h2 className="section-title mt-4">
          A few engineering problems I like thinking about.
        </h2>
        <p className="prose-measure mt-5">
          Interactive architecture demos — simplified examples. They use local,
          deterministic data. They are not replicas of production systems.
        </p>
      </div>
      <div className="reveal glass-panel mt-10 overflow-hidden rounded-[28px]">
        <div
          role="tablist"
          aria-label="Demo modes"
          className="flex gap-2 overflow-x-auto border-b border-line p-3"
        >
          {modes.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={mode === item.id}
              aria-controls={`panel-${item.id}`}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-4 text-sm",
                mode === item.id
                  ? "bg-iris-soft text-canvas"
                  : "text-secondary hover:bg-white/5",
              )}
              onClick={() => setMode(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`panel-${mode}`}
          aria-labelledby={`tab-${mode}`}
          className="p-4 sm:p-6"
        >
          {mode === "payments" ? <PaymentsDemo /> : null}
          {mode === "rag" ? <RagDemo /> : null}
          {mode === "reliability" ? <ReliabilityDemo /> : null}
        </div>
      </div>
    </Section>
  );
}

function PaymentsDemo() {
  const reduce = useReducedMotion();
  const run = useRef(0);
  const [active, setActive] = useState("booking");
  const [status, setStatus] = useState("Idle. Send a booking, or retry one that already completed.");
  const [log, setLog] = useState<LogLine[]>([]);
  const [busy, setBusy] = useState(false);
  const seen = useRef(false);

  const nodes = [
    ["booking", "Booking request"],
    ["validate", "Payment validation"],
    ["kafka", "Kafka event"],
    ["consumer", "Idempotent consumer"],
    ["result", "Confirmed result"],
  ] as const;

  async function play(retry: boolean) {
    const id = ++run.current;
    setBusy(true);
    const steps = retry
      ? [
          ["kafka", "The same event is delivered again. The log only promises at-least-once."],
          ["consumer", seen.current
            ? "The key is already recorded. The consumer does not apply a second business write."
            : "No prior key exists yet. The consumer treats this as the first delivery."],
          ["result", seen.current
            ? "Still one confirmed result. The retry was a delivery, not a second payout."
            : "Confirmed once. The key is now a receipt."],
        ]
      : [
          ["booking", "A booking arrives with a stable idempotency key."],
          ["validate", "Validation decides the payment is allowed. It does not move the money."],
          ["kafka", "An event is published. The key travels with it."],
          ["consumer", "The consumer records the key, then applies the business result once."],
          ["result", "Confirmed. A later delivery of this key must not create another result."],
        ];

    if (reduce) {
      setLog(steps.map((step, index) => ({ id: index, text: step[1] })));
      setActive(steps[steps.length - 1][0]);
      setStatus(steps[steps.length - 1][1]);
      seen.current = true;
      setBusy(false);
      return;
    }

    setLog([]);
    for (const [index, step] of steps.entries()) {
      if (run.current !== id) return;
      setActive(step[0]);
      setStatus(step[1]);
      setLog((lines) => [...lines, { id: index, text: step[1] }]);
      await wait(680);
    }
    seen.current = true;
    if (run.current === id) setBusy(false);
  }

  return (
    <DemoLayout
      diagram={
        <NodeRow
          nodes={nodes}
          active={active}
          onSelect={(id) => {
            setActive(id);
            const found = nodes.find((node) => node[0] === id);
            if (found) setStatus(detailFor(found[0]));
          }}
        />
      }
      status={status}
      log={log}
      actions={
        <>
          <DemoButton disabled={busy} onClick={() => play(false)}>
            Send booking
          </DemoButton>
          <DemoButton disabled={busy} onClick={() => play(true)}>
            Simulate retry
          </DemoButton>
        </>
      }
      note="An idempotent consumer remembers the key. The retry still happens. The business result does not."
    />
  );
}

function detailFor(id: string) {
  const copy: Record<string, string> = {
    booking: "The request carries a key the rest of the path can share.",
    validate: "Validation is a decision. Execution is a different step.",
    kafka: "Publishing is not the same as processing exactly once.",
    consumer: "This is where a duplicate becomes a no-op.",
    result: "One confirmed outcome, even if the event arrives twice.",
    api: "The caller sets a deadline and can cancel.",
    service: "The service passes that deadline downstream and limits how many calls run at once.",
    downstream: "If the deadline fires, the service stops waiting.",
  };
  return copy[id] ?? "";
}

function RagDemo() {
  const [selected, setSelected] = useState<(typeof questions)[number] | null>(null);
  const [activeChunk, setActiveChunk] = useState<string | null>(null);

  const question = selected ?? questions[0];
  const chunk = question.chunks.find((item) => item.id === activeChunk);

  return (
    <DemoLayout
      diagram={
        <div>
          <div className="flex flex-col gap-2">
            {questions.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "min-h-11 rounded-2xl border px-3 py-2 text-left text-sm",
                  selected?.id === item.id
                    ? "border-iris-soft bg-iris/10"
                    : "border-line hover:border-white/20",
                )}
                onClick={() => {
                  setSelected(item);
                  setActiveChunk(null);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {question.chunks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveChunk(item.id)}
                className={cn(
                  "rounded-2xl border p-3 text-left",
                  item.hit ? "border-mint/50 bg-mint/10" : "border-line opacity-60",
                  activeChunk === item.id && "ring-1 ring-iris-soft",
                )}
              >
                <span className="font-mono text-[0.65rem] text-iris-soft">{item.id}</span>
                <span className="mt-1 block text-xs leading-5 text-secondary">{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      }
      status={
        chunk
          ? chunk.text
          : selected
            ? question.answer
            : "Choose a sample question. Highlighted chunks are the ones retrieval would pass on."
      }
      log={
        selected
          ? [
              { id: 1, text: "Retrieval selects the highlighted chunks. The dimmed ones stay out of context." },
              { id: 2, text: `Illustrative answer: ${question.answer}` },
              { id: 3, text: `Citations: ${question.cites}. Not a live model.` },
            ]
          : []
      }
      actions={
        <p className="text-sm text-secondary">
          Synthetic documents only. Nothing here calls a model or reads a company knowledge base.
        </p>
      }
      note="The answer is allowed to use the retrieved context, and it has to name the sources."
    />
  );
}

type Slot = "free" | "busy" | "done" | "stopped";

function ReliabilityDemo() {
  const reduce = useReducedMotion();
  const tokens = useRef<number[]>([0, 0]);
  const slotsRef = useRef<Slot[]>(["free", "free"]);
  const [slots, setSlots] = useState<Slot[]>(["free", "free"]);
  const [status, setStatus] = useState(
    "Two slots. A third request does not start until one is free.",
  );
  const [log, setLog] = useState<LogLine[]>([]);
  const [active, setActive] = useState("api");

  function commit(next: Slot[]) {
    slotsRef.current = next;
    setSlots([...next]);
  }

  function push(text: string) {
    setLog((lines) => [...lines, { id: lines.length + 1, text }]);
  }

  async function send() {
    const current = slotsRef.current;
    const freeIndex = current.findIndex((slot) => slot === "free");
    if (freeIndex < 0) {
      setStatus(
        "At capacity. The third request waits or is refused. It does not run unbounded.",
      );
      push("Rejected: both concurrency slots are busy.");
      return;
    }
    const token = ++tokens.current[freeIndex];
    const next = [...current];
    next[freeIndex] = "busy";
    commit(next);
    setActive("service");
    setStatus("In flight. The deadline travels with the call.");
    push(`Slot ${freeIndex + 1} accepted the request.`);
    if (reduce) {
      const done = [...slotsRef.current];
      done[freeIndex] = "free";
      commit(done);
      setActive("downstream");
      setStatus("Downstream answered inside the deadline. The slot is free again.");
      push("Completed inside the illustrative deadline.");
      return;
    }
    await wait(900);
    const afterWait = slotsRef.current[freeIndex];
    if (tokens.current[freeIndex] !== token || afterWait !== "busy") return;
    const done = [...slotsRef.current];
    done[freeIndex] = "done";
    commit(done);
    setActive("downstream");
    setStatus("Downstream answered inside the deadline. The slot is free again.");
    push("Completed inside the illustrative deadline.");
    await wait(500);
    const afterDone = slotsRef.current[freeIndex];
    if (afterDone !== "done") return;
    const freed = [...slotsRef.current];
    freed[freeIndex] = "free";
    commit(freed);
  }

  function fail(kind: "timeout" | "cancel") {
    const index = slotsRef.current.findIndex((slot) => slot === "busy");
    if (index < 0) {
      setStatus("Nothing is in flight. Send a request first.");
      return;
    }
    tokens.current[index] += 1;
    const next = [...slotsRef.current];
    next[index] = "stopped";
    commit(next);
    setActive("downstream");
    if (kind === "timeout") {
      setStatus(
        "Deadline exceeded. The service stops waiting and tells the caller it timed out.",
      );
      push("Cancellation propagated. No orphaned downstream wait.");
    } else {
      setStatus("Caller canceled. The same cancellation reaches the downstream call.");
      push("Caller cancel propagated. The slot is released.");
    }
    window.setTimeout(() => {
      if (slotsRef.current[index] !== "stopped") return;
      const released = [...slotsRef.current];
      released[index] = "free";
      commit(released);
    }, reduce ? 0 : 700);
  }

  return (
    <DemoLayout
      diagram={
        <div>
          <NodeRow
            nodes={[
              ["api", "API request"],
              ["service", "Go service"],
              ["downstream", "Downstream"],
            ]}
            active={active}
            onSelect={(id) => {
              setActive(id);
              setStatus(detailFor(id));
            }}
          />
          <div className="mt-4 flex gap-3">
            {slots.map((slot, index) => (
              <div
                key={index}
                className={cn(
                  "flex-1 rounded-2xl border px-3 py-4 text-center text-sm",
                  slot === "busy" && "border-iris-soft bg-iris/15",
                  slot === "done" && "border-mint/50 bg-mint/10",
                  slot === "stopped" && "border-danger/60 bg-danger/10",
                  slot === "free" && "border-line",
                )}
              >
                <p className="font-mono text-[0.65rem] text-muted">Slot {index + 1}</p>
                <p className="mt-1 capitalize">{slot}</p>
              </div>
            ))}
          </div>
        </div>
      }
      status={status}
      log={log}
      actions={
        <>
          <DemoButton onClick={send}>Send request</DemoButton>
          <DemoButton onClick={() => fail("timeout")}>Simulate timeout</DemoButton>
          <DemoButton onClick={() => fail("cancel")}>Cancel request</DemoButton>
        </>
      }
      note="Bounded concurrency, a deadline, and cancellation are the whole demo. The Go service here is illustrative."
    />
  );
}

function DemoLayout({
  diagram,
  status,
  log,
  actions,
  note,
}: {
  diagram: React.ReactNode;
  status: string;
  log: LogLine[];
  actions: React.ReactNode;
  note: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.8fr]">
      <div className="overflow-x-auto rounded-[22px] border border-line bg-canvas/60 p-4">
        {diagram}
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm leading-6 text-secondary" aria-live="polite">
          {status}
        </p>
        <div className="flex flex-wrap gap-2">{actions}</div>
        <ol className="max-h-48 space-y-2 overflow-auto rounded-2xl border border-line p-3 font-mono text-[0.72rem] leading-5 text-muted">
          {log.length === 0 ? <li>Waiting for an interaction.</li> : null}
          {log.map((line) => (
            <li key={line.id}>{line.text}</li>
          ))}
        </ol>
        <p className="text-sm leading-6 text-secondary">{note}</p>
      </div>
    </div>
  );
}

function NodeRow({
  nodes,
  active,
  onSelect,
}: {
  nodes: readonly (readonly [string, string])[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex min-w-[520px] items-center gap-2 lg:min-w-0 lg:flex-wrap">
      {nodes.map(([id, label], index) => (
        <div key={id} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect(id)}
            className={cn(
              "min-h-11 rounded-2xl border px-3 py-2 text-left text-sm",
              active === id ? "border-iris-soft bg-iris/15 text-ink" : "border-line text-secondary",
            )}
          >
            {label}
          </button>
          {index < nodes.length - 1 ? <span className="text-muted">→</span> : null}
        </div>
      ))}
    </div>
  );
}

function DemoButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="min-h-11 rounded-full border border-line px-4 text-sm text-ink enabled:hover:border-iris-soft disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
