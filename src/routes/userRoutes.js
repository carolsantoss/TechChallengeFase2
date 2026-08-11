const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authCheck = require('../auth/authCheck');
const roleCheck = require('../auth/roleCheck');


router.get('/users', userController.getAll);
router.get('/users/:id',  userController.getById);
router.post('/users', authCheck, roleCheck('admin'),userController.create);
router.put('/users/:id',authCheck, roleCheck('admin'), userController.update);
router.delete('/users/:id',authCheck,roleCheck('admin'),  userController.delete);


module.exports = router;