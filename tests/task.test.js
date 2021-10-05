const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
    userOne,
    setupDatabase,
    userTwo,
    taskOne,
    taskTwo
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create task for user", async () => {
    const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({ description: "From my test" })
        .expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toBe(false);
});

test("Should get all the tasks created by the user", async () => {
    const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(2);
});

test("Should not delete other user's task", async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404);

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
});

test("Should not create task with invalid description", async () => {
    await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(400);
});

test("Should delete user task", async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const task = await Task.findById(taskOne._id);
    expect(task).toBeNull();
});

test("Should fetch user task by id", async () => {
    const task = await request(app)
        .get(`/tasks/${taskTwo._id}`)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(task).not.toBeNull();
});

test("Should fetch all user's completed tasks", async () => {
    const response = await request(app)
        .get("/tasks?completed=true")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(1);
});
