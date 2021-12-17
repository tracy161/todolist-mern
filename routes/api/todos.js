const express = require('express');
const router = express.Router();
const Todo = require('../../models/TodoModel');
const User = require('../../models/UserModel');

// @desc    Get logged in user orders
// @route   GET /api/todos/mytodos
// @access  Private
router.get('/mytodos', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).populate('user', [
      'content',
      'status',
    ]);
    if (!todos) {
      return res
        .status(400)
        .json({ msg: 'There is no todolist for this user' });
    } else {
      res.json(todos);
    }
  } catch (error) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/todos
// @desc    Create a todolist
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newTodo = new Todo({
      content: req.body.content,
      status: req.body.status,
      user: req.user.id,
    });

    const createdTodo = await newTodo.save();

    res.status(201).json(createdTodo);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/todos/:id
// @desc    Fetch single todolist
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(500).send('Server error');
  }
});

// @route   PUT api/todos/:id
// @desc    Edit single todolist
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { content, status } = req.body;

  try {
    const todo = await Todo.findById(req.params.id);

    if (todo) {
      todo.content = content;
      todo.status = status;

      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(500).send('Server error');
  }
});

// @route   DELETE api/todos/:id
// @desc    Delete single todolist
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (todo) {
      await todo.remove();
      res.json({ message: 'Item removed' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(500).send('Server error');
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', auth, async (req, res) => {
  const admin = await User.findById(req.user.id);

  if (admin.isAdmin === true) {
    const todos = await Todo.find({}).populate('user', 'name');
    res.json(todos);
  } else {
    res
      .status(401)
      .json({ errors: [{ message: 'Not Authorized as an admin' }] });
  }
});

module.exports = router;
