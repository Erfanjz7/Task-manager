import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // مسیر فایل Firebase config

const TestFirestore = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks")); // دریافت دیتا از کالکشن tasks
        const tasksArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksArray); // ذخیره در State
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">لیست تسک‌ها</h2>
      {tasks.length === 0 ? (
        <p>هیچ تسکی موجود نیست.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="p-2 border rounded">
              <strong>{task.title}</strong>: {task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestFirestore;
