import UpComing from "./UpComing";
import { useState } from "react";

function App() {
  var [newTask, setNewTask] = useState(false);
  var [taskDesc, setTaskDesc] = useState("");
  var [priority, setPriority] = useState("");
  var [date, setDate] = useState("");

  let addTask = (e) => {
    e.preventDefault();
    setNewTask(!newTask);
  };

  return (
    <div
      className=" bg-[url('scheduler(2).jpg')] contrast-105 shadow-inner
     h-screen z-2 bg-repeat bg-right flex-col font-[delius] "
    >
      <header
        className="bg-slate-100 opacity-95 text-center text-4xl p-4 font-bold text-green-500 
      w-screen shadow-lg "
      >
        Task scheduler
      </header>
      <main
        className=" bg-slate-200 opacity-90 rounded-2xl shadow-lg
       min-h-70 z-1 flex-col text-center mx-30 my-5 p-6"
      >
        <form onSubmit={addTask}>
          <input // First Input : Task description
            className="bg-white w-50 rounded-sm p-2 mx-3"
            id="task"
            onChange={(e) => setTaskDesc(e.target.value)}
            value={taskDesc}
            placeholder="Enter task..."
            required
          />
          <select // Second Input : task priority
            className="bg-white w-50 rounded-sm p-2 mx-3 hover:cursor-pointer "
            id="priority"
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
            required
          >
            <option hidden>Choose priority... </option>
            <option>Top priority</option>
            <option>Middle priority</option>
            <option>Less priority</option>
          </select>
          <input // third Input : task deadline
            className="bg-white w-40 rounded-sm cursor-pointer p-2 mx-3"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            id="date"
            placeholder="choose deadline..."
            required
          />
          <input // Submit button
            className="bg-emerald-400 cursor-pointer rounded-md transition 
            duration-600 hover:bg-emerald-500 m-3  px-5 py-3 text-xl"
            type="submit"
          />
        </form>

        <UpComing
          insertTask={newTask}
          info={{ desc: taskDesc, priority: priority, date: date }}
        />
      </main>
    </div>
  );
}
export default App;
