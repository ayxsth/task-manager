const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = new express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Please check back later.');
// });

app.use(express.json());    //this will automatically parse incoming json to an object
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});