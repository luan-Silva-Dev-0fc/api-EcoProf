const express = require('express');
const router = express.Router();
const { deletePost } = require('../controllers/deletePostController');
const auth = require('../middleware/auth');

router.delete('/:postId', auth, deletePost);

module.exports = router;
