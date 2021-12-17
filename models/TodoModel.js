const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  { 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = Todo = mongoose.model('todo', todoSchema);
