import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase.config";

const TodoTask = ({ task, id, deleteTodo, isChecked }) => {

  // TODO: edit check handler
  const updateCheckbox = async () => {
    try {
      const taskDocument = doc(db, "tasks", id);
      await updateDoc(taskDocument, {
        task: task,
        isChecked: !isChecked,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // TODO: edit task handler
  const [updatedTask, setUpdatesTask] = useState([task]);

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

  // TODO: display edit and save change
  const [isEditing, setIsEditing] = useState(false);

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
      <input type="checkbox" checked={isChecked} onChange={updateCheckbox} />
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
