import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase.config";

const TodoTask = ({ task, id, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatesTask] = useState([task]);

  // TODO: edit task handler
  const updateTask = async (e) => {
    e.preventDefault();
    console.log(updatedTask);

    try {
      const taskDocument = doc(db, "tasks", id);
      await updateDoc(taskDocument, {
        task: updatedTask,
        isChecked: false,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  function handleSave(e) {
    updateTask(e);
    setIsEditing(false);
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input type="checkbox" />
      {/* ============================================ */}
      {isEditing ? (
        <>
          <div
            style={{
              display: "flex",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              defaultValue={updatedTask}
              onChange={(e) => setUpdatesTask(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>{task}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </>
      )}

      {/* ============================================ */}

      <button onClick={() => deleteTodo(id)}>Delete</button>
    </div>
  );
};

export default TodoTask;
