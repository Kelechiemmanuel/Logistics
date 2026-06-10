const express = require('express');
const router = express.Router();
const { createShipment } = require('../controllers/shipmentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/create', 
    authMiddleware, 
    roleMiddleware("customer"),
    createShipment);

module.exports = router;