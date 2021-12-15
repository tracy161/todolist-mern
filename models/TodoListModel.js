const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema(
  { 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  },
  content: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
    default: false,
  }
}, {
  timestamps: true
});

module.exports = TodoList = mongoose.model('todoList', todoListSchema);
