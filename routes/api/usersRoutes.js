/* 
BONUS: Remove a user's associated thoughts when deleted.
/api/users/:userId/friends/:friendId
POST to add a new friend to a user's friend list
DELETE to remove a friend from a user's friend list
*/

const router = require("express").Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, updateFriends, removeFriend } = require("../../controllers/usersController"); //import controllers(add rute)

// /api/users
router.route("/")
.get(getUsers) //GET all users
.post(createUser) //POST a new user

// /api/users/:userId
router.route("/:userId")
.get(getSingleUser) //GET a single user by its _id and populated thought and friend data
.put(updateUser) //PUT to update a user by its _id
.delete(deleteUser); //DELETE to remove user by its _id

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId")
.post(updateFriends)
.delete(removeFriend);


module.exports = router;
