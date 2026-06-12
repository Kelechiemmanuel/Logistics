const pool = require('../config/db');


//GET MY SHIPMENTS
const getMyShipments = async (req, res) => {
    const customerId = req.user.id;
    try {
        const shipments = await pool.query('SELECT * FROM shipments WHERE customer_id = $1', [customerId]);
        return res.status(200).json({
            message: "Fetched shipments successfully",
            shipments: shipments.rows
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Fail to fetch shipment"
        })
    }
}

//TRACK MY SHIPMENT
const trackShipments = async (req, res) => {
    const { trackingId } = req.params;
    try {
        const tracking = await pool.query('SELECT * FROM shipments WHERE tracking_id = $1', [trackingId]);
        return res.status(200).json({
            message: "shipment tracking fetched",
            tracking: tracking.rows[0]
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Fail to track shipment"
        })
    }
}

module.exports = {
    getMyShipments,
    trackShipments
}