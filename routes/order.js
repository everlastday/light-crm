const express = require('express');
const controller = require('../controllers/order');
const router = express.Router();

router.get('/', controller.getByAll);
router.post('/', controller.create);

module.exports = router;