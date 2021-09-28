const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        //email and password needs to get added
        user: '',
        pass: ''
    }
});

const sendWelcomeEmail = (email, name) => {
    transporter.sendMail({
        from: '"9TaskTodo" <ninetasktodo@outlook.com>',
        to: email,
        subject: 'Welcome to 9TaskToDo!',
        text: `Welcome, ${name}! Hope you have a manage all your pending tasks using 9TaskToDo app.`
    });
}

const sendByeEmail = (email, name) => {
    transporter.sendMail({
        from: '"9TaskTodo" <ninetasktodo@outlook.com>',
        to: email,
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}! Hope to see you back sometime soon.`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendByeEmail
}