import React, { useState } from "react";
import { MdDone, MdCreate, MdDelete, MdUndo, MdOutlineCancel } from "react-icons/md";
import "./App.css";

interface TaskData {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState<TaskData | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");

  const addTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTask: TaskData = {
      id: tasks.length + 1,
      title: newTaskTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEditing = (task: TaskData) => {
    setEditingTask(task);
    setEditedTaskTitle(task.title);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditedTaskTitle("");
  };

  const updateTask = () => {
    if (editedTaskTitle.trim() === "") return;

    const updatedTasks = tasks.map((task) =>
      task.id === editingTask?.id ? { ...task, title: editedTaskTitle } : task
    );

    setTasks(updatedTasks);
    setEditingTask(null);
    setEditedTaskTitle("");
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="New task..."
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id}>
            {editingTask?.id === task.id ? (
              <div>
                <input
                  type="text"
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                />
                <MdDone className="downButton" onClick={updateTask} />
                <MdOutlineCancel className="downButton" onClick={cancelEditing} />
              </div>
            ) : (
              <div>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
                <div className="task-icons">
                  <>
                    {task.completed ? (
                      <>
                        <MdUndo
                          className="downButton"
                          onClick={() => toggleTask(task.id)}
                        />
                      </>
                    ) : (
                      <>
                        <MdDone
                          className="downButton"
                          onClick={() => toggleTask(task.id)}
                        />
                      </>
                    )}
                  </>
                  <MdCreate
                    className="downButton"
                    onClick={() => startEditing(task)}
                  />
                  <MdDelete
                    className="downButton"
                    onClick={() => deleteTask(task.id)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
