const express = require('express');
const router = express.Router();
const privateMessageController = require('../controllers/privateMessage.controllers');

router.post('/message', privateMessageController.privateMessage);

module.exports = router;