const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

const authCheck = require('../auth/authCheck');


router.get('/posts/search', postController.search);
router.get('/posts', postController.getAll);
router.get('/posts/:id', postController.getById);


////PROF
router.post('/posts',authCheck, postController.create);
router.put('/posts/:id',authCheck,postController.update);
router.delete('/posts/:id', authCheck,postController.delete);


module.exports = router;