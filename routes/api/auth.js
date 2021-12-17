const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');
const generateToken = require('../../utils/generateToken');
const auth = require('../../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      return res
        .status(401)
        .json({ errors: [{ message: 'Invalid Email of Password' }] });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/auth
// @desc    Get a user details
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      return res.status(404).json({ errors: [{ message: 'User not Found' }] });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/auth
// @desc    Update user details
// @access  Private
router.put('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if(req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      return res.status(404).json({ errors: [{ message: 'User not Found' }] });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;
