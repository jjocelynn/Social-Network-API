const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json("new user created! 🎉"))
      .catch((err) => res.status(500).json(err));
  },
  // get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // update a single user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json("User updated! 🎉")
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete a single user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
        } else {
          Thought.deleteMany(
            { username: req.body.username },
            function (err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log(`Removed all thoughts by this user`);
              }
            }
          );
        }
        res.json("user deleted!");
      })
      .catch((err) => res.status(500).json(err));
  },

  // add a friend to a specific user
  updateFriends(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: "No user with this Id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //remove a friend from a specific user
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user or friend with this id!" })
          : res.json("Friend deleted!")
      )
      .catch((err) => res.status(500).json(err));
  },
};
