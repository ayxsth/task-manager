const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");

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

beforeEach(async () => {
    await User.deleteMany({});
    await new User(userOne).save();
});

test("Should signup a new user", async () => {
    const response = await request(app)
        .post("/users")
        .send({
            name: "Aayush",
            email: "aayush101@yopmail.com",
            password: "HelloWorld!"
        })
        .expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            name: "Aayush",
            email: "aayush101@yopmail.com"
        },
        token: user.tokens[0].token
    });
});

test("Should login existing user", async () => {
    const response = await request(app)
        .post("/users/login")
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login with bad credentials", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: "test@exampl.com",
            password: "HiWorld!"
        })
        .expect(400);
});

test("Should get profile for user", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test("Should not get profile for unauthorized user", async () => {
    await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
    const response = await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test("Should not delete account for unauthorized user", async () => {
    await request(app).delete("/users/me").send().expect(401);
});
