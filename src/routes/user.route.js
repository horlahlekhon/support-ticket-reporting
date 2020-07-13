const express = require('express')
const validate = require('../middlewares/validate.middleware')
const userValidation = require('../validations/user.validations')
const userController = require('../controllers').userController
const auth =  require('../middlewares/auth.middleware')

const router = express.Router()

router.
    route('/')
    .post(auth('manageUsers', 'getUsers'), validate(userValidation.createUser), userController.createUser )
    .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers)

router
    .route('/:userId')
    .get(auth('getUsers', 'getSelf'), validate(userValidation.getUser), userController.getUser)
    .patch(auth('manageUsers', 'getSelf'), validate(userValidation.updateUser), userController.updateUser)
    .delete(auth('manageUsers', 'getSelf'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
