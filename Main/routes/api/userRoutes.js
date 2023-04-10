const router = require('express').Router();
const {
  getAllUsers,
  createOneUser,
  getUserById,
  updateOneUser,
  deleteOneUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController.js');


router.route('/')
  .get(getAllUsers)
  .post(createOneUser);

router.route('/:userId')
  .get(getUserById)
  .put(updateOneUser)
  .delete(deleteOneUser);

router.route('/:userId/friends/')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
