const express = require('express');
const v1UserVerify = require('../controllers/v1UserVerify');
const router = express.Router();

router.get('/verify',v1UserVerify);

exports.userVerify = router;