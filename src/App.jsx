import React, { useState } from 'react';
import './App.css';

function TaskManager({ tasks, setTasks, deletedTasks, setDeletedTasks }) {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, { title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleCompleted = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (index) => {
    const deletedTask = tasks[index];
    setTasks(tasks.filter((task, i) => i !== index));
    setDeletedTasks([...deletedTasks, deletedTask]);
  };

  return (
    <div className="task-manager-widget">
      <h2 className="title">Task Manager</h2>
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="new-task-input"
        />
        <button className='newTask' type="submit">Add Task</button>
      </form>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompleted(index)}
              className="task-checkbox"
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }} className="task-title">
              {task.title}
            </span>
            <button onClick={() => handleDeleteTask(index)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DeletedTasks({ deletedTasks, setDeletedTasks, tasks, setTasks }) {
  const handleRestoreTask = (index) => {
    const restoredTask = deletedTasks[index];
    setDeletedTasks(deletedTasks.filter((task, i) => i !== index));
    setTasks([...tasks, restoredTask]);
  };

  const handlePermanentDeleteTask = (index) => {
    setDeletedTasks(deletedTasks.filter((task, i) => i !== index));
  };

  return (
    <div className="deleted-tasks-widget">
      <h2 className="title">Deleted Tasks</h2>
      <ul className="deleted-task-list">
        {deletedTasks.map((task, index) => (
          <li key={index} className="deleted-task-item">
            <span className="deleted-task-title">{task.title}</span>
            <button onClick={() => handleRestoreTask(index)} className="restore-button">
              Restore
            </button>
            <button onClick={() => handlePermanentDeleteTask(index)} className="permanent-delete-button">
              Permanently Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);

  return (
    <div className="task-manager-container">
      <TaskManager tasks={tasks} setTasks={setTasks} deletedTasks={deletedTasks} setDeletedTasks={setDeletedTasks} />
      <DeletedTasks deletedTasks={deletedTasks} setDeletedTasks={setDeletedTasks} tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;