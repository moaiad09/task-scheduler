import React, { useEffect, useMemo, useState } from "react";

export default function Completed({ tasks = [], onClear }) {
  const [tasksDone, setTasksDone] = useState([]);

  useEffect(() => {
    setTasksDone(Array.isArray(tasks) ? tasks : []);
  }, [tasks]);

  const rows = useMemo(() => {
    return tasksDone.map((t, idx) => (
      <tr
        key={t.id || idx}
        className="border-b border-white/10 hover:bg-white/5 transition"
      >
        <td className="py-3 pr-2 align-top">
          <div className="text-white/90 font-semibold flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/90 text-white text-sm">
              ✓
            </span>
            <span>
              {idx + 1} - {t.desc}
            </span>
          </div>
          <div className="text-xs text-white/60 mt-1">
            {t.doneAt ? `Done: ${new Date(t.doneAt).toLocaleString()}` : "Completed"}
          </div>
        </td>

        <td className="py-3 px-2 align-top">
          <PriorityBadge value={t.priority} />
        </td>

        <td className="py-3 px-2 align-top text-white/80">
          {t.date || "—"}
        </td>
      </tr>
    ));
  }, [tasksDone]);

  return (
    <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-left text-xl sm:text-2xl font-bold tracking-wide text-amber-300">
          Completed tasks
        </h2>

        <div className="flex items-center gap-3">
          <div className="text-sm text-white/70">
            {tasksDone.length} item{tasksDone.length === 1 ? "" : "s"}
          </div>

          <button
            type="button"
            onClick={() => {
              if (typeof onClear === "function") onClear();
            }}
            className="rounded-xl px-4 py-2 font-semibold
                       bg-white/10 text-white/85 ring-1 ring-white/15
                       hover:bg-white/15 transition
                       focus:outline-none focus:ring-2 focus:ring-amber-200"
            title="Clear completed tasks"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl ring-1 ring-white/10 bg-white/5">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="text-left text-sm uppercase tracking-wide text-white/70">
              <th className="py-3 px-4">Task</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Deadline</th>
            </tr>
          </thead>

          <tbody>
            {tasksDone.length ? (
              rows
            ) : (
              <tr>
                <td className="py-6 px-4 text-white/70" colSpan={3}>
                  No completed tasks yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- UI Helpers ---------- */

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
      {value || "—"}
    </span>
  );
}
