import React, { useState } from 'react';
import TaskForm from './TaskForm';

const Task = ({ task, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);

  const handleEdit = () => setEditing(true);

  const handleUpdate = (updatedTask) => {
    onUpdate(updatedTask);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(task._id);
  };

  return (
    <div className="task">
      {!editing ? (
        <div>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Due Date: {task.dueDate}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <TaskForm task={task} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default Task;
