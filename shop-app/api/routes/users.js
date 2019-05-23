var express     =   require("express");
var router      =   express.Router({mergeParams: true});

// Restful API is stateless, do not need to log out the user => Use Token

const UsersController = require('../controllers/users');

// Register
router.post("/register", UsersController.users_register);
// Login
router.post("/login", UsersController.users_login);
// Delete
router.delete("/:userId", UsersController.users_delete);


module.exports = router;