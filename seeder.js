const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const todoLists = require('./data/todoLists');
const User = require('./models/UserModel');
const TodoList = require('./models/TodoListModel');

dotenv.config();

const connectDB = async () => {
  try {
  
    await mongoose.connect(process.env.MONGO_URI);

  } catch (err) {
    console.error(err.message.red.inverse);
    // Exit process with failure
    process.exit(1);
  }
}

connectDB();

const importData = async () => {
  try {
    await TodoList.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleTodos = todoLists.map(todoList => {
      return { ...todoList, user: adminUser}
    })

    await TodoList.insertMany(sampleTodos)

    console.log('Data Imported'.green.inverse)
    process.exit()
  } catch (err) {
      console.error(err.message.red.inverse);
      process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await TodoList.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed'.red.inverse)
    process.exit()
  } catch (err) {
      console.error(err.message.red.inverse);
      process.exit(1);
  }
}

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}