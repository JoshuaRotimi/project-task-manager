import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firestore";

export const useUserAndProject = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const getTaskDetails = async () => {
    try {
      const querySnapshotUsers = await getDocs(collection(db, "users"));
      const querySnapshotProjects = await getDocs(collection(db, "projects"));
      const tasksAssignee = querySnapshotUsers.docs.map(
        (doc) => `${doc.data().firstName} ${doc.data().lastName}`
      );

      const taskProjects = querySnapshotProjects.docs.map(
        (doc) => doc.data().name
      );
      setUsers(tasksAssignee);
      setProjects(taskProjects);
    } catch (e) {
      console.log("Data fetching failed.");
    }
  };

  useEffect(() => {
    getTaskDetails();
  }, []);

  return { users, projects };
};
