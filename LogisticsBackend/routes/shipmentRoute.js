const express = require('express');
const router = express.Router();
const { createShipment } = require('../controllers/shipmentController');
const { getMyShipment, trackShipments} = require('../controllers/customerController')
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/create', 
    authMiddleware, 
    roleMiddleware("customer"),
    createShipment);

router.get('/track/:trackingId', 
    authMiddleware,
    roleMiddleware("customer", "admin"),
    trackShipments

)
module.exports = router;