import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";

import { db } from "../../config/firestore";

const Dashboard = ({ setIsAuthenticated }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newProject, setNewProject] = useState("");

  const getTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const allTasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(allTasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleEdit = (id) => {
    const [task] = tasks.filter((task) => task.id === id);

    setSelectedTask(task);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        // TODO delete document
        try {
          deleteDoc(doc(db, "tasks", id));
        } catch (e) {
          console.log("Unable to delete task.");
        }

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `Task has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const tasksCopy = tasks.filter((task) => task.id !== id);
        setTasks(tasksCopy);
      }
    });
  };

  const addProject = async () => {
    if (!newProject) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Add a valid Project name.",
        showConfirmButton: true,
      });
    }

    try {
      await addDoc(collection(db, "projects"), { name: newProject });
    } catch (e) {
      console.log("Failed to add New Project");
    }

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `New Project Created!`,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => setNewProject(""));
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            tasks={tasks}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <div>
            <label htmlFor="newProject">Add New Project</label>
            <input
              id="newProject"
              type="text"
              name="newProject"
              placeholder={"New Project Name"}
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
            />
            <button type="submit" value="Add Project" onClick={addProject}>
              Add Project
            </button>
          </div>
        </>
      )}
      {isAdding && <Add setIsAdding={setIsAdding} getTasks={getTasks} />}
      {isEditing && (
        <Edit
          selectedTask={selectedTask}
          setIsEditing={setIsEditing}
          getTasks={getTasks}
        />
      )}
    </div>
  );
};

export default Dashboard;
