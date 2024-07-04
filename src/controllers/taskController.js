const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      user: req.user.id,
    });

    const task = await newTask.save();

    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.getTasks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const tasks = await Task.find({ user: req.user.id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Task.countDocuments({ user: req.user.id });

    res.json({
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, status, dueDate } },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Task removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
