const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

const authCheck = require('../auth/authCheck');
const roleCheck = require('../auth/roleCheck');



router.get('/posts/search', postController.search);
router.get('/posts', postController.getAll);
router.get('/posts/:id', postController.getById);


////PROF
router.post('/posts',authCheck,roleCheck('docente'), postController.create);
router.put('/posts/:id',authCheck, roleCheck('docente'),postController.update);
router.delete('/posts/:id', authCheck,roleCheck('docente'),postController.delete);


module.exports = router;
