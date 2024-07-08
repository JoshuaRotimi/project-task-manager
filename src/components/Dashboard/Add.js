import React, { useState } from "react";
import Swal from "sweetalert2";
import Dropdown from "./Dropdown";
import { useUserAndProject } from "../../hooks/getUserAndProject";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

const Add = ({ setIsAdding, getTasks }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [user, setUser] = useState("");
  const [project, setProject] = useState("");
  const [date, setDate] = useState("");

  const { users, projects } = useUserAndProject();

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name || !desc || !user || !project || !date) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newTask = {
      name,
      description: desc,
      user,
      project,
      date,
    };

    try {
      await addDoc(collection(db, "tasks"), { ...newTask });
    } catch (e) {
      console.log("Data adding failed");
    }

    setIsAdding(false);
    getTasks();
    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `New Task Created!`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Task</h1>
        <label htmlFor="name">Task Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          placeholder={"Give this task a title."}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="desc">Task Description</label>
        <input
          id="desc"
          type="text"
          name="desc"
          placeholder={"Explain what this task is supposed to do ..."}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Dropdown
          title={"Assign User"}
          options={users}
          onChange={(e) => setUser(e)}
        />
        <Dropdown
          title={"Assign Project"}
          options={projects}
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
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
