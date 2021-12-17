const express = require('express');
const router = express.Router();
const generateToken = require('../../utils/generateToken');
const User = require('../../models/UserModel');
const Todo = require('../../models/TodoModel')
const auth = require('../../middleware/authMiddleware');
//const { check, validationResult } = require('express-validator');

// @route   POST api/users
// @desc    Register a new user
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ errors: [{ message: 'User already exists' }] });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ errors: [{ message: 'Invalid user data' }] });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', auth, async (req, res) => {
  try {
    const admin = await User.findById(req.user.id);

    if (admin.isAdmin === true) {
      const users = await User.find({});
      res.json(users);
    } else {
      res
        .status(401)
        .json({ errors: [{ message: 'Not Authorized as an admin' }] });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/users/:id
// @desc    Delete a user
// @access  Private/Admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const admin = await User.findById(req.user.id);

    if (admin.isAdmin === true) {
      const user = await User.findById(req.params.id);
     
      // Remove User & User's todolist
      if (user) {
        await Todo.deleteMany({ user: req.params.id})
        await user.remove();
        res.json({ message: 'User removed' });

      } else {
        res.status(404).json({ errors: [{ message: 'User not found' }] });
      }
    } else {
      res
        .status(401)
        .json({ errors: [{ message: 'Not Authorized as an admin' }] });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private/Admin
router.get('/:id', auth, async (req, res) => {
  try {
    const admin = await User.findById(req.user.id);

    if (admin.isAdmin === true) {
      const user = await User.findById(req.params.id).select('-password');
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ errors: [{ message: 'User not found' }] });
      }
    } else {
      res
        .status(401)
        .json({ errors: [{ message: 'Not Authorized as an admin' }] });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/users/:id
// @desc    Update user details by admin
// @access  Private/Amin
router.put('/:id', auth, async (req, res) => {
  try {
    const admin = await User.findById(req.user.id);

    if (admin.isAdmin === true) {
      const user = await User.findById(req.params.id);

      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save();

        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin
        });
      } else {
        return res
          .status(404)
          .json({ errors: [{ message: 'User not Found' }] });
      }
    } else {
      res
        .status(401)
        .json({ errors: [{ message: 'Not Authorized as an admin' }] });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
