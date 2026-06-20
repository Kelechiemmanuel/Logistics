const express = require("express");
const router = express.Router();

const { getAnalytics } = require("../controllers/analyticsController");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/analytics", 
    roleMiddleware("admin"), 
    getAnalytics);

module.exports = router;