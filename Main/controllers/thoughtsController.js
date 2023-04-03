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
      { _id: req.params.userId},
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
      { _id: req.params.userId},
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

  // module.exports = {
  //   // Get all students
  //   getStudents(req, res) {
  //     Student.find()
  //       .then(async (students) => {
  //         const studentObj = {
  //           students,
  //           headCount: await headCount(),
  //         };
  //         return res.json(studentObj);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return res.status(500).json(err);
  //       });
  //   },
  //   // Get a single student
  //   getSingleStudent(req, res) {
  //     Student.findOne({ _id: req.params.studentId })
  //       .select('-__v')
  //       .then(async (student) =>
  //         !student
  //           ? res.status(404).json({ message: 'No student with that ID' })
  //           : res.json({
  //               student,
  //               grade: await grade(req.params.studentId),
  //             })
  //       )
  //       .catch((err) => {
  //         console.log(err);
  //         return res.status(500).json(err);
  //       });
  //   },
  //   // create a new student
  //   createStudent(req, res) {
  //     Student.create(req.body)
  //       .then((student) => res.json(student))
  //       .catch((err) => res.status(500).json(err));
  //   },
  //   // Delete a student and remove them from the course
  //   deleteStudent(req, res) {
  //     Student.findOneAndRemove({ _id: req.params.studentId })
  //       .then((student) =>
  //         !student
  //           ? res.status(404).json({ message: 'No such student exists' })
  //           : Course.findOneAndUpdate(
  //               { students: req.params.studentId },
  //               { $pull: { students: req.params.studentId } },
  //               { new: true }
  //             )
  //       )
  //       .then((course) =>
  //         !course
  //           ? res.status(404).json({
  //               message: 'Student deleted, but no courses found',
  //             })
  //           : res.json({ message: 'Student successfully deleted' })
  //       )
  //       .catch((err) => {
  //         console.log(err);
  //         res.status(500).json(err);
  //       });
  //   },
  
  //   // Add an assignment to a student
  //   addAssignment(req, res) {
  //     console.log('You are adding an assignment');
  //     console.log(req.body);
  //     Student.findOneAndUpdate(
  //       { _id: req.params.studentId },
  //       { $addToSet: { assignments: req.body } },
  //       { runValidators: true, new: true }
  //     )
  //       .then((student) =>
  //         !student
  //           ? res
  //               .status(404)
  //               .json({ message: 'No student found with that ID :(' })
  //           : res.json(student)
  //       )
  //       .catch((err) => res.status(500).json(err));
  //   },
  //   // Remove assignment from a student
  //   removeAssignment(req, res) {
  //     Student.findOneAndUpdate(
  //       { _id: req.params.studentId },
  //       { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //       { runValidators: true, new: true }
  //     )
  //       .then((student) =>
  //         !student
  //           ? res
  //               .status(404)
  //               .json({ message: 'No student found with that ID :(' })
  //           : res.json(student)
  //       )
  //       .catch((err) => res.status(500).json(err));
  //   },
  // };
  