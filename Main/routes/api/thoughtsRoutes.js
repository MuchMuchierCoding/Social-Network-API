const router = require('express').Router();

const {
  getThoughts,
  createThought,
  getThoughtById,
  updateOneThought,
  deleteOneThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController');


router.route('/')
  .get(getThoughts)
  .post(createThought);


router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateOneThought)
  .delete(deleteOneThought);


router.route('/:thoughtId/reactions')
  .post(addReaction);


router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
