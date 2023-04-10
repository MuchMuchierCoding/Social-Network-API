const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find({})
        .then(async (thoughts) => {
        const thoughtsObj = {
          thoughts,
        };
        return res.json(thoughtsObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
  },

  //Get thought through id 
  getThoughtById(req, res) {
    Thought.findOne({_id: req.params.userId})
        .select('-__v')
        .then(async (thought) =>
            !thought
            ? res.status(404).json({message: 'No user found with that ID'})
            : res.status(200).json(thought)
          )
          .catch((err) => {console.log(err);res.status(500).json(err)});
  },
  
  //Update thought through id
  updateOneThought(req, res) {
      Thought.updateOne(
        {_id: req.params.userId},
        {$set: req.body},
        {runValidators: true, new: true}
      )
      .then((thought) =>
        !thought
        ? res.status(404).json({message: 'No user found with that ID'})
        :res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Delete thought through id
  deleteOneThought(req, res) {
      Thought.deleteOne({ _id: req.params.userId})
      .then((thought) =>
        !thought
        ? res.status(404).json({message: 'No user found with that ID'})
        : Thought.deleteMany({ _id: {$in: user.thoughts}})
      )
      .then(() => res.json({ message: "Thought Deleted"}))
      .catch((err) => res.status(500).json(err));
  },

  //Add reaction 
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId},
      { $addToSet: {reactions: req.body}},
      { runValidators: true, new: true}
    )
    .then((thought) =>
    !thought
    ? res.status(404).json({message: 'No Friend with that ID'})
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
    },

  
  //Delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId},
      { $pull: { friends: req.params.friendId}},
      { runValidators: true, new: true}
    )
    .then((user) =>
    !user
    ? res.status(404).json({ message: 'No Friend with that ID'})
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
  };

  