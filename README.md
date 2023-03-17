# Social Network API

## Description ![MIT badge](https://img.shields.io/badge/License-MIT-brightgreen)

This is an API for a social networking application created with Express.js and Mongoose. It runs with the help of MongoDB and Insomnia since there is no frontend for this application. The application allows users to view, create, update and delete thoughts and users and also allows users the option of adding friends, and reactions to thoughts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Questions](#questions)

## Installation

1. open the terminal to the "Social-Network-API" directory 
2. "npm install" necessary libraries 
3. "npm run dev" 
4. test the routes in Insomnia

## Usage

Available routes following the domain (http://localhost:3001):

* /api/users
    * GET request for getting all users
    * POST request for creating a user (needs a "username" and "email" field in the JSON body)
* /api/users/:userID
    * GET request for getting a single user
    * PUT request for updating a single user (needs a "username" and "email" field in the JSON body)
    * DELETE request for deleting a single user (needs a "username" in the JSON body to deleted related thought)
* /api/users/:userId/friends/:friendId
    * POST request for adding a friend
    * DELETE request for deleting a friend

* /api/thoughts
    * GET request for getting all thoughts
    * POST request for creating a thought (needs a "thoughtText" and "username" field in the JSON body)
* /api/thoughts/:thoughtId
    * GET request for getting a single thoughts
    * PUT request for updating a single thought (needs a "thoughtText in the JSON body)
    * DELETE request for deleting a single thought
* /api/thoughts/:thoughtId/reactions
    * POST request for adding a reaction to specific thought (needs a "reactionBody" and "username" in the JSON body)
* /api/thoughts/:thoughtId/reactions/:reactionId
    * DELETE request for deleting a reaction

## License

Please refer to the LICENSE in the repo

## Questions

Check out my GitHub here: https://github.com/jjocelynn
