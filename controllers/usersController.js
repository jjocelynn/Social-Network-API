const User = require("../models/User");

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .populate({
        path: "thoughts",
        select: "thoughtText reactions.reactionBody reactions.username reactions.dateAndTime reactionCount ",
      })
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json("new user created! 🎉"))
      .catch((err) => res.status(500).json(err));
  },
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
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json("User updated! 🎉")
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : User.deleteOne({ _id: { $in: req.params.userId } })
      )
      .then(() => res.json("user deleted!"))
      .catch((err) => res.status(500).json(err));
  },
};
