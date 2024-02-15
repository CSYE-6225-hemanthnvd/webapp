const express = require('express');
const router = express.Router();
const methodNotAllowed = require('../controllers/405');
const v1UserSelfGet = require('../controllers/v1UserSelfGet');
const v1UserSelfPut = require('../controllers/v1UserSelfPut');

router.get('/self',v1UserSelfGet)
router.put('/self',v1UserSelfPut);
router.use('/self',methodNotAllowed)

exports.userSelf = router;