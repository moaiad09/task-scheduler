import React, { useEffect, useMemo, useState } from "react";
import Completed from "./Completed";

export default function UpComing(props) {
  const [tasks, setTasks] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [toast, setToast] = useState(null); 
  const [confettiBursts, setConfettiBursts] = useState([]); 

  useEffect(() => {
    const incoming = props.info;

    if (!incoming?.desc) return;

    const normalized = {
      id: cryptoId(),
      desc: incoming.desc.trim(),
      priority: incoming.priority || "Middle priority",
      date: incoming.date || "",
      createdAt: Date.now(),
    };

    setTasks((prev) => [normalized, ...prev]);
    pushToast("success", "Task added successfully.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.insertTask]);

  function cryptoId() {
    try {
      if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
    } catch (_) {}
    return `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function pushToast(type, text) {
    setToast({ type, text });
    window.clearTimeout(pushToast._t);
    pushToast._t = window.setTimeout(() => setToast(null), 2400);
  }

  function fireConfetti() {
    const burstId = cryptoId();
    setConfettiBursts((prev) => [...prev, burstId]);
    window.setTimeout(() => {
      setConfettiBursts((prev) => prev.filter((id) => id !== burstId));
    }, 1400);
  }

  function markDone(taskId) {
    setTasks((prev) => {
      const found = prev.find((t) => t.id === taskId);
      if (!found) return prev;

      // move to completed
      setTasksDone((donePrev) => [{ ...found, doneAt: Date.now() }, ...donePrev]);

      // UI effects
      fireConfetti();
      pushToast("success", "Completed. Great job.");

      // remove from upcoming
      return prev.filter((t) => t.id !== taskId);
    });
  }

  const rows = useMemo(() => {
    return tasks.map((t, idx) => (
      <tr
        key={t.id}
        className="border-b border-white/10 hover:bg-white/5 transition"
      >
        <td className="py-3 pr-2 align-top">
          <div className="text-white/90 font-semibold">
            {idx + 1} - {t.desc}
          </div>
          <div className="text-xs text-white/60 mt-1">
            {t.date ? `Due: ${t.date}` : "No deadline"}
          </div>
        </td>

        <td className="py-3 px-2 align-top">
          <PriorityBadge value={t.priority} />
        </td>

        <td className="py-3 px-2 align-top text-white/80">
          {t.date || "—"}
        </td>

        <td className="py-3 pl-2 align-top">
          <button
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold
                       bg-amber-400 text-slate-900 shadow-md shadow-amber-400/15
                       hover:bg-amber-300 active:scale-[0.99] transition
                       focus:outline-none focus:ring-2 focus:ring-amber-200"
            onClick={() => markDone(t.id)}
            type="button"
            title="Mark as done"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/90 text-white">
              ✓
            </span>
            Mark done
          </button>
        </td>
      </tr>
    ));
  }, [tasks]);

  return (
    <div className="relative">
      {/* Toast */}
      {toast && (
        <div
          className={`mb-4 rounded-2xl px-4 py-3 text-sm font-semibold ring-1 backdrop-blur
            ${
              toast.type === "success"
                ? "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25"
                : toast.type === "error"
                ? "bg-red-500/15 text-red-200 ring-red-400/25"
                : "bg-white/10 text-white/80 ring-white/15"
            }`}
        >
          {toast.text}
        </div>
      )}

      {confettiBursts.map((id) => (
        <ConfettiOverlay key={id} />
      ))}

      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-left text-xl sm:text-2xl font-bold tracking-wide text-amber-300">
          Upcoming tasks
        </h2>

        <div className="text-sm text-white/70">
          {tasks.length} item{tasks.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl ring-1 ring-white/10 bg-white/5">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="text-left text-sm uppercase tracking-wide text-white/70">
              <th className="py-3 px-4">Task</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Deadline</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length ? (
              rows
            ) : (
              <tr>
                <td className="py-6 px-4 text-white/70" colSpan={4}>
                  No upcoming tasks yet. Add one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Completed
          tasks={tasksDone}
          onClear={() => {
            setTasksDone([]);
            pushToast("info", "Completed tasks cleared.");
          }}
        />
      </div>
    </div>
  );
}
function PriorityBadge({ value }) {
  const cls = (() => {
    if (value === "Top priority")
      return "bg-red-500/15 text-red-200 ring-red-400/25";
    if (value === "Middle priority")
      return "bg-amber-500/15 text-amber-200 ring-amber-400/25";
    return "bg-sky-500/15 text-sky-200 ring-sky-400/25";
  })();

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ring-1 ${cls}`}
      title={value}
    >
      {value}
    </span>
  );
}

function ConfettiOverlay() {
  const pieces = Array.from({ length: 26 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((_, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.2}s`,
            transform: `translateY(-10px) rotate(${Math.random() * 90}deg)`,
          }}
        />
      ))}

      <style>{`
        .confetti-piece {
          position: absolute;
          top: -10px;
          width: 10px;
          height: 14px;
          border-radius: 3px;
          opacity: 0.9;
          background: linear-gradient(180deg, rgba(251,191,36,0.95), rgba(16,185,129,0.9));
          box-shadow: 0 6px 18px rgba(0,0,0,0.18);
          animation: confetti-fall 1.25s ease-in forwards;
        }

        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 0.95; }
          100% { transform: translateY(520px) rotate(220deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
