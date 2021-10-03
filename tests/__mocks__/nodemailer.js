const CreateTransport = function () {
    this.sendMail = () => {};
};

// OR

// class CreateTransport {
//     sendMail() {}
// }

const createTransport = () => {
    return new CreateTransport();
};

module.exports = {
    createTransport
};
