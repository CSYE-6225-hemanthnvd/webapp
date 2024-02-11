const express = require('express');
const router = express.Router();
const methodNotAllowed = require('../controllers/405');
const healthzGet = require('../controllers/healthzGet');

router.head('/healthz',methodNotAllowed)
router.get('/healthz',healthzGet)
router.use('/healthz',methodNotAllowed)

exports.healthz = router;