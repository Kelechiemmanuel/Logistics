const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getAssignedShipments, updateShipmentStatus } = require('../controllers/driverController');

router.get('/shipments',
    authMiddleware,
    getAssignedShipments,
    roleMiddleware("driver")
)


router.patch('/shipments/:id/status',
    authMiddleware,
    updateShipmentStatus,
    roleMiddleware("driver")
)

module.exports = router;