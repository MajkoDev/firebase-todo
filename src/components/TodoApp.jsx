import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../services/firebase.config";
import TodoTask from "./TodoTask";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [createTodo, setCreateTodo] = useState("");

  const [loading, setLoading] = useState(true);

  const collectionRef = collection(db, "tasks");

  //TODO: fetching data from firebase
  useEffect(() => {
    const getTasks = async () => {
      await getDocs(collectionRef).then((tasks) => {
        let taskData = tasks.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTasks(taskData);
        setLoading(false);
      });
    };
    getTasks();
  }, []);

  // TODO: add task handler
  const submitTask = async (e) => {
    // prevent reloading page
    e.preventDefault();

    try {
      // function adding the object to collection
      await addDoc(collectionRef, {
        task: createTodo,
        isChecked: false,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // TODO: delete task handler
  const deleteTodo = async (id) => {
    try {
      window.confirm("Are you sure you want to delete this task?");
      // database, name of collection, id
      const documentRef = doc(db, "tasks", id);
      await deleteDoc(documentRef);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  

  //! console.log("tasks", tasks);

  return (
    <div>
      <div className="add-todo">
        <form>
          <input
            type="text"
            placeholder="New Task"
            onChange={(e) => setCreateTodo(e.target.value)}
          />
          <button onClick={submitTask}>Add Todo</button>
        </form>
      </div>

      <hr style={{ margin: "20px 0px" }} />

      {loading ? (
        <>Loading</>
      ) : (
        <>
          <div className="todo-list">
            {tasks.map(({ task, id }) => (
              <div key={id}>
                <TodoTask task={task} id={id} deleteTodo={deleteTodo} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoApp;
