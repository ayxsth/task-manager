const nodemailer = require('nodemailer');

const user = process.env.EMAIL;
const pass = process.env.PASS;

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user,
        pass
    }
});

const sendWelcomeEmail = (email, name) => {
    transporter.sendMail({
        from: `"9TaskTodo" <${user}>`,
        to: email,
        subject: 'Welcome to 9TaskToDo!',
        text: `Welcome, ${name}! Hope you will manage all your pending tasks using 9TaskToDo app.`
    });
}

const sendByeEmail = (email, name) => {
    transporter.sendMail({
        from: `"9TaskTodo" <${user}>`,
        to: email,
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}! Hope to see you back sometime soon.`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendByeEmail
}