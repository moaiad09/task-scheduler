import UpComing from "./UpComing";
import { useState } from "react";

function App() {
  const [submitTick, setSubmitTick] = useState(0);
  const [taskDesc, setTaskDesc] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [lastSubmittedTask, setLastSubmittedTask] = useState(null);

  const addTask = (e) => {
    e.preventDefault();

    const payload = {
      desc: taskDesc.trim(),
      priority,
      date,
    };

    setLastSubmittedTask(payload);
    setSubmitTick((n) => n + 1);

    setTaskDesc("");
    setPriority("");
    setDate("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-[delius] text-slate-900">
      <div
        className="absolute inset-0 bg-[url('scheduler(2).jpg')] bg-cover bg-center"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/40 to-slate-950/60"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
      </div>

      <div className="relative z-10">
        <header className="mx-auto max-w-6xl px-4 pt-6">
          <div className="rounded-2xl bg-white/10 backdrop-blur-md shadow-lg ring-1 ring-white/15">
            <div className="flex items-center justify-between px-6 py-5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-amber-300 drop-shadow">
                Task Scheduler
              </h1>
              <div className="hidden sm:flex items-center gap-2 text-sm text-white/80">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-300" />
                <span className="tracking-wide">Gold Theme</span>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">
          <section className="rounded-3xl bg-white/12 backdrop-blur-md shadow-xl ring-1 ring-white/15">
            <div className="p-5 sm:p-8">
              <form
                onSubmit={addTask}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end"
              >
                <div className="md:col-span-5">
                  <label
                    htmlFor="task"
                    className="block text-sm font-semibold text-white/80 mb-1"
                  >
                    Task
                  </label>
                  <input
                    className="w-full rounded-xl bg-white/90 px-4 py-3 outline-none ring-1 ring-black/5
                               focus:ring-2 focus:ring-amber-400 transition"
                    id="task"
                    onChange={(e) => setTaskDesc(e.target.value)}
                    value={taskDesc}
                    placeholder="Enter task..."
                    required
                  />
                </div>

                <div className="md:col-span-4">
                  <label
                    htmlFor="priority"
                    className="block text-sm font-semibold text-white/80 mb-1"
                  >
                    Priority
                  </label>
                  <select
                    className="w-full rounded-xl bg-white/90 px-4 py-3 outline-none ring-1 ring-black/5
                               focus:ring-2 focus:ring-amber-400 transition hover:cursor-pointer"
                    id="priority"
                    onChange={(e) => setPriority(e.target.value)}
                    value={priority}
                    required
                  >
                    <option value="" hidden>
                      Choose priority...
                    </option>
                    <option>Top priority</option>
                    <option>Middle priority</option>
                    <option>Less priority</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label
                    htmlFor="date"
                    className="block text-sm font-semibold text-white/80 mb-1"
                  >
                    Deadline
                  </label>
                  <input
                    className="w-full rounded-xl bg-white/90 px-4 py-3 outline-none ring-1 ring-black/5
                               focus:ring-2 focus:ring-amber-400 transition cursor-pointer"
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    id="date"
                    required
                  />
                </div>

                <div className="md:col-span-12 flex justify-end pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold
                               bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/20
                               hover:bg-amber-300 active:scale-[0.99] transition
                               focus:outline-none focus:ring-2 focus:ring-amber-200"
                  >
                    Add Task
                  </button>
                </div>
              </form>

              <div className="my-6 h-px w-full bg-white/15" />

              <div className="rounded-2xl bg-white/10 ring-1 ring-white/10 p-4 sm:p-6">
                <UpComing insertTask={submitTick} info={lastSubmittedTask} />
              </div>
            </div>
          </section>
        </main>
      </div>

      <style>{`
        .blob {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 9999px;
          filter: blur(40px);
          opacity: 0.18;
          background: radial-gradient(circle at 30% 30%, rgba(251,191,36,0.95), rgba(251,191,36,0));
          mix-blend-mode: screen;
          transform: translate3d(0,0,0);
          animation-duration: 18s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .blob-1 {
          top: -160px;
          left: -140px;
          animation-name: float1;
        }

        .blob-2 {
          bottom: -200px;
          right: -180px;
          width: 620px;
          height: 620px;
          opacity: 0.14;
          animation-name: float2;
          animation-duration: 22s;
        }

        .blob-3 {
          top: 35%;
          left: 60%;
          width: 420px;
          height: 420px;
          opacity: 0.12;
          animation-name: float3;
          animation-duration: 26s;
        }

        @keyframes float1 {
          0%, 100% { transform: translate(-10px, -6px) scale(1); }
          50% { transform: translate(70px, 40px) scale(1.08); }
        }

        @keyframes float2 {
          0%, 100% { transform: translate(10px, 10px) scale(1); }
          50% { transform: translate(-90px, -50px) scale(1.06); }
        }

        @keyframes float3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-60px, 50px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

export default App;
