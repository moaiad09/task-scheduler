import React, { useEffect, useState } from "react";

export default function Completed(props) {
  let [tasksDone, setTasksDone] = useState([]);

  useEffect(() => {
    setTasksDone([...props.tasks]);
    console.log(props.tasks);
  }, [props.tasks]);

  let showTable = () => {
    if (props.tasks) {
      console.log(tasksDone);
      return tasksDone.map((e, i) => {
        return (
          <tr key={i}>
            <td>{++i + " - " + e.desc}</td>
            <td>{e.priority}</td>
            <td>{e.date}</td>
            {/* <td>
              <button
                className="bg-sky-300 hover:bg-sky-400 my-2 px-3 py-1 rounded-full cursor-pointer"
                onClick={(task) => {
                  setTasksDone(
                    [...props.tasks],
                    props.tasks.slice(props.tasks.indexOf(task), 1)
                  );
                  setRender(!render);
                }}
              >
                mark as done
              </button>
            </td> */}
          </tr>
        );
      });
    }
  };

  return (
    <div>
      <p className="font-bold text-2xl text-left text-green-500 mx-2 my-5 font-serif">
        Completed tasks :
      </p>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-2xl text-orange-500 ">Task</th>
            <th className="text-2xl text-orange-500 ">Priority</th>
            <th className="text-2xl text-orange-500 ">Deadline</th>
          </tr>
        </thead>
        <tbody>{showTable()}</tbody>
      </table>{" "}
      <button className="bg-red-300 hover:bg-red-400 my-2 px-3 py-1 rounded-full cursor-pointer">
        Clear
      </button>
    </div>
  );
}
