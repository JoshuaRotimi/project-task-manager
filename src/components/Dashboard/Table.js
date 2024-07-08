import React from "react";

const Table = ({ tasks, handleEdit, handleDelete }) => {
  // const formatter = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  //   minimumFractionDigits: null,
  // });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Assigned User</th>
            <th>Project attached</th>
            <th>Due Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks ? (
            tasks.map((task, i) => (
              <tr key={task.id}>
                <td>{i + 1}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.user}</td>
                <td>{task.project} </td>
                <td>{task.date} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Tasks</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
