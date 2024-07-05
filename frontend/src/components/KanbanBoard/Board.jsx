import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Task from './Task';
import TaskForm from './TaskForm';

const Board = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('api/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error(err.response.data.msg);
      }
    };
//fetch
    fetchTasks();
  }, []);

  const handleCreateTask = async (newTask) => {
    try {
      const res = await api.post('api/tasks', newTask);
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const res = await api.put(`api/tasks/${updatedTask._id}`, updatedTask);
      setTasks(tasks.map(task => (task._id === updatedTask._id ? res.data : task)));
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Kanban Board</h2>
      <div className="board">
        <div className="column">
          <h3>To Do</h3>
          {tasks.filter(task => task.status === 'to-do').map(task => (
            <Task key={task._id} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
          ))}
          <TaskForm onCreate={handleCreateTask} status="to-do" />
        </div>
        <div className="column">
          <h3>In Progress</h3>
          {tasks.filter(task => task.status === 'in progress').map(task => (
            <Task key={task._id} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
          ))}
          <TaskForm onCreate={handleCreateTask} status="in progress" />
        </div>
        <div className="column">
          <h3 >Done</h3>
          {tasks.filter(task => task.status === 'done').map(task => (
            <Task key={task._id} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
          ))}
          <TaskForm onCreate={handleCreateTask} status="done" />
        </div>
      </div>
    </div>
  );
};

export default Board;
