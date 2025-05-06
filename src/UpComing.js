import React, { useEffect, useState } from "react";
import Completed from "./Completed";

export default function UpComing(props) {
  let [tasks, setTasks] = useState([]);
  let [tasksDone, setTasksDone] = useState([]);

  useEffect(() => {
    if (props.info.desc) setTasks([...tasks, props.info]);
    // eslint-disable-next-line
  }, [props.insertTask]);

  let showTable = () => {
    if (tasks) {
      return tasks.map((e, i) => {
        return (
          <tr key={i}>
            <td>{++i + " - " + e.desc}</td>
            <td>{e.priority}</td>
            <td>{e.date}</td>
            <td>
              <button
                className="bg-sky-300 hover:bg-sky-400 my-2 px-3 py-1 rounded-full cursor-pointer"
                onClick={(task) => {
                  setTasksDone([
                    ...tasksDone,
                    tasks.slice(tasks.indexOf(task), 1),
                  ]);
                  console.log(tasksDone);
                }}
              >
                mark as done
              </button>
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <div>
      <p className="font-bold text-2xl text-left text-purple-500 m-2 font-serif">
        Upcoming tasks :
      </p>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-2xl text-orange-500 ">Task</th>
            <th className="text-2xl text-orange-500 ">Priority</th>
            <th className="text-2xl text-orange-500 ">Deadline</th>
            <th className="text-2xl text-orange-500 ">Action</th>
          </tr>
        </thead>
        <tbody>{showTable()}</tbody>
      </table>
      <Completed tasks={tasksDone} />
    </div>
  );
}
