const { User, Thought } = require('../models');



module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a user
  createOneUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //Get user through id 
  getById(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID' })
          : res.status(200).json(user)
      )
      .catch((err) => { console.log(err); res.status(500).json(err) });
  },

  //Update user through id
  updateOneUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID' })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Delete user through id
  deleteOneUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.status(200).json({ message: "User Deleted" }))
      .catch((err) => res.status(500).json(err));
  },

  //Add Friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No Friend with that ID' })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },


  //Delete Friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No Friend with that ID' })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

