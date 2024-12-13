import React, { useState, useEffect } from "react";

function Todo() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task }]);
    setTask("");
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    setTask(taskToEdit.text);
    setIsEditing(true);
    setCurrentTaskId(id);
  };

  const updateTask = () => {
    setTasks(tasks.map((t) => (t.id === currentTaskId ? { ...t, text: task } : t)));
    setTask("");
    setIsEditing(false);
    setCurrentTaskId(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <>
      <div className="todo-app justify-content-center align-item-center">
        <h1>Todo App</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
          />
          <button
            className={`btn btn-${isEditing ? "warning" : "primary"}`}
            onClick={isEditing ? updateTask : addTask}
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
        <ul className="list-group">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {t.text}
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => editTask(t.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTask(t.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Todo;