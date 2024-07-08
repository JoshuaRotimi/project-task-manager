import React, { useState } from "react";
import Swal from "sweetalert2";
import { useUserAndProject } from "../../hooks/getUserAndProject";
import Dropdown from "./Dropdown";
import { db } from "../../config/firestore";
import { doc, setDoc } from "firebase/firestore";

const Edit = ({ selectedTask, setIsEditing, getTasks }) => {
  const id = selectedTask.id;

  const [name, setName] = useState(selectedTask.name);
  const [desc, setDesc] = useState(selectedTask.description);
  const [user, setUser] = useState(selectedTask.user);
  const [project, setProject] = useState(selectedTask.project);
  const [date, setDate] = useState(selectedTask.date);

  const { users, projects } = useUserAndProject();

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !desc || !user || !project || !date) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const task = {
      id,
      name,
      description: desc,
      user,
      project,
      date,
    };

    try {
      await setDoc(doc(db, "tasks", id), { ...task });
    } catch (e) {
      console.log("Unable to update task.");
    }

    setIsEditing(false);
    getTasks();

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `Task has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Task</h1>
        <label htmlFor="name">Task Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="desc">Task Description</label>
        <input
          id="desc"
          type="text"
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Dropdown
          title={"Assign User"}
          options={users}
          value={user}
          onChange={(e) => setUser(e)}
        />
        <Dropdown
          title={"Assign Project"}
          options={projects}
          value={project}
          onChange={(e) => setProject(e)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
