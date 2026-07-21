const express = require('express');
const router = express.Router();

const { getClients, addClient } = require('../controllers/clientController');

router.get('/', getClients);
router.post('/', addClient);

module.exports = router;