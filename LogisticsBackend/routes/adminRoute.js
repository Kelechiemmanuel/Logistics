const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getAllUsers, getAllShipments, deleteShipment, assignDriver } = require('../controllers/adminController');

router.get('/users', 
    authMiddleware,
    roleMiddleware('admin'),
    getAllUsers
);

router.get('/shipments',
    authMiddleware,
    roleMiddleware('admin'),
    getAllShipments
);

router.delete('/shipments/:id',
    authMiddleware,
    roleMiddleware('admin'),
    deleteShipment
);

router.post('/assign-driver',
    authMiddleware,
    roleMiddleware("admin"),
    assignDriver
)


module.exports = router;