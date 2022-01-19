# Task Manager API

This is a **REST API** created using Node.js and Express. It manages all the tasks and the accounts related stuffs which is created using this API.

## HTTP Request

### GET

All **GET** requests in this app requires **authentication** before being sent to the server. Basically, these requests **retrieve data from the server** and return it.

-   /users/me

    This request retrieves all of the **authenticated user's data** from the database and returns it to the user, excluding **sensitive** data.

-   /tasks/:id

    This request retrieves data using the **specified id**. If the task is available in the database, it returns the data; otherwise, an **error** is returned (404).

-   /tasks

    This request will return **all of the tasks** that the authenticated user has created.

### POST

All **POST** requests in this app require **authentication (except for /users and /users/login)**. The primary objective of these requests is to **create data on the server**. Some requests require the body to be sent with the request so that the data passed in the body can be stored accordingly.

-   /users

    This request allows a user to create an account for the task app by simply sending the **user's details** in the body area, including name, email, password, and age _(optional)_.

    _Body Example_

    ```json
    {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "HelloWorld!!!"
    }
    ```

-   /users/login

    By submitting **account credentials** in the body area, this request can be used to login to the user's account and creates a unique token which gets stored in the database.

    _Body Example_

    ```json
    {
        "email": "johndoe@example.com",
        "password": "HelloWorld!!!"
    }
    ```

-   /users/logout

    This request deletes the **current token** from the database and logs the **authenticated user** out of the application.

-   /users/logoutAll

    Essentially, this request deletes **all tokens** present in the database, logging the user out of **all devices**, including the present one.

-   /users/me/avatar

    This request allows the user to add an avatar to their account. The **file must be attached in the body** in order for it to be uploaded as an avatar.

-   /tasks

    If the user is **authenticated** in the application, this request will store the task in the database according to the data provided in the body section which includes description and completed _(optional)_.

    _Body Example_

    ```json
    {
        "description": "Complete the REST API."
    }
    ```

### PATCH

Even with this application's **PATCH** request, every request requires **authentication** to obtain the correct response. PATCH requests are used to **update existing data**, and the data to be modified is given via the body portion.

-   /users/me

    This request updates the **account information** in the database by passing the valid data that needs to be changed in the body. If any **additional data** is sent which is not available in the database, an **error** encounters.

    _Body Example_

    ```json
    {
        "name": "John",
        "password": "HelloWorld!"
    }
    ```

-   /tasks/:id

    This request allows the user to update the tasks that he or she has created. It tries to **match the owner with the authenticated user** if the task with the related id exits. And if all goes well, the task is updated; otherwise, an error is thrown.

    _Body Example_

    ```json
    {
        "completed": true
    }
    ```

### DELETE

Like the other requests, **DELETE** request also requires authentication to perform any requests in this application. These request are used to delete the data from the database.

-   /users/me/avatar

    This request deletes the **avatar of the user** that is logged in.

-   /users/me

    This request deletes the **user** as well as all of the **tasks that the user has created**.

-   /tasks/:id

    If **authenticated**, this request deletes the task associated with the specified id.

## Deployment

-   [NineTaskToDo](https://ninetasktodo.herokuapp.com/) (_API ONLY_)

## Prerequisite

-   [Node.js](https://nodejs.org/en/download/)
-   Text Editor (E.g.: [Visual Studio Code](https://code.visualstudio.com/download)) / IDE
-   [MongoDB](https://www.mongodb.com/try/download/community)

## Running the repository

-   Clone the repository.

    `git clone https://github.com/ayxsth/task-manager.git`

-   Open in the Text Editor. _(optional)_
-   Configure environment variable for **PORT, EMAIL, PASS, JWT_SECRET, and MONGODB_URL** in `config/dev.env`.
-   Run the terminal and change the directory.
-   Install all the required libraries.

    `npm i`

-   Execute the file.

    `npm run start`
