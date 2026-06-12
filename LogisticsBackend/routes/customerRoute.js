const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const { getMyShipments, trackShipments } = require('../controllers/customerController');
const {createShipment } = require('../controllers/shipmentController')

router.get('/shipments', 
    authMiddleware,
    roleMiddleware("customer"),
    getMyShipments
)

router.get('/track/:trackingId',
    authMiddleware,
    roleMiddleware("customer"),
    trackShipments
)

// router.post('/create', 
//     authMiddleware, 
//     roleMiddleware("customer"),
//     createShipment);

module.exports = router;