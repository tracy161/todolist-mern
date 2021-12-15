const express = require('express');
const router = express.Router();
const TodoListModel = require('../../models/TodoListModel')

// @route   GET api/todolists
// @desc    Fetch all todolists
// @access  Public
router.get('/', async (req, res) => {
  try {
    const todoLists = await TodoListModel.find({})
    
    res.json(todoLists)

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
  
})

// @route   GET api/todolists/:id
// @desc    Fetch single todolist
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const todoList = await TodoListModel.findById(req.params.id)

    if(todoList) {
      res.json(todoList)
    } else {
      res.status(404)
      throw new Error('Item not found')
    }
  } catch (err) {
    console.log(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(500).send('Server error')
  }
  
})

module.exports = router