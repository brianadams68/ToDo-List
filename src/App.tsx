import React, { useState } from 'react';
import './App.css';

import Task from './Task';

interface TaskData {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (newTaskTitle.trim() === '') return;

    const newTask: TaskData = {
      id: tasks.length + 1,
      title: newTaskTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
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
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
            onDelete={deleteTask}
            onToggle={toggleTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
