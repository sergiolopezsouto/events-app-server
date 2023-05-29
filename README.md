## Instructions

- Clone this repo
- Run `npm i`
- Run `npm run dev` or `nodemon` to start the project



## AUTH ENDPOINTS

Base URL: `/auth` 

| Route             | HTTP Verb | Description                     |
| ----------------- | --------- | ------------------------------- |
| `/register`       | POST      | Signup User                     |
| `/login`          | POST      | Login User                      |
| `/verify`         | GET       | Verify Auth Token               |



## EVENT ENDPOINTS

Base URL: `/events` 

| Route             | HTTP Verb | Description                     |
| ----------------- | --------- | ------------------------------- |
| `/getAllEvents`   | GET       | List of all events              |
| `/:id`            | GET       | Details of a specific event     |
| `/saveEvent`      | POST      | Create a new event              |
| `/:id`            | PUT       | Update a specific event         |
| `/:id`            | DELETE    | Delete a specific event         |



## USER ENDPOINTS

Base URL: `/users` 

| Route             | HTTP Verb | Description                     |
| ----------------- | --------- | ------------------------------- |
| `/getAllUsers`    | GET       | List of all users               |
| `/:id`            | GET       | Details of a specific user      |
| `/:id`            | PUT/PATCH | Update a specific user          |
| `/:id`            | DELETE    | Delete a specific user          |