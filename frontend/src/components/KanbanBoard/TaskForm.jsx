import React, { useState } from 'react';

const TaskForm = ({ onCreate, status, task }) => {
  const [formData, setFormData] = useState({
    title: task ? task.title : '',
    description: task ? task.description : '',
    status: status,
    dueDate: task ? task.dueDate : '',
  });

  const { title, description, dueDate } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    onCreate(formData);
    setFormData({
      title: '',
      description: '',
      status: status,
      dueDate: ''
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Title" name="title" value={title} onChange={onChange} required />
      <textarea placeholder="Description" name="description" value={description} onChange={onChange}></textarea>
      <input type="date" placeholder="Due Date" name="dueDate" value={dueDate} onChange={onChange} />
      <button type="submit">Save</button>
    </form>
  );
};

export default TaskForm;
