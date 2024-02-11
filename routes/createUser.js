const express = require('express');
const v1UserPost = require('../controllers/v1UserPost');
const router = express.Router();

router.post('/user',v1UserPost);

exports.createUser = router;