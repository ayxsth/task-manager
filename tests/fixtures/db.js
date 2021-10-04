const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: "Admin",
    email: "admin101@yopmail.com",
    password: "HelloWorld!",
    tokens: [
        {
            token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
        }
    ]
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
    _id: userTwoId,
    name: "Staff",
    email: "staff101@yopmail.com",
    password: "HelloWork!",
    tokens: [
        {
            token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
        }
    ]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "Task One",
    completed: false,
    owner: userOne._id //userOneId also works
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Task Two",
    completed: true,
    owner: userOne._id //userOneId also works
};

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Task Three",
    completed: true,
    owner: userTwo._id //userTwoId also works
};

const setupDatabase = async () => {
    await User.deleteMany({});
    await Task.deleteMany({});
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
};
