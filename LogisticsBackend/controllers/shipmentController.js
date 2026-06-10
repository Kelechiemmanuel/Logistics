const pool = require('../config/db');
const generateTrackingId = require('../util/generateTrackingId');
const { calculatePrice } = require('../Services/pricingService');


const createShipment = async (req, res) => {
    const {
        pickup_address,
        pickup_lat,
        pickup_lng,
        destination_address,
        destination_lat,
        destination_lng,
        weight,
        distance
    } = req.body;

    const tracking_id = generateTrackingId();
    const amount = calculatePrice(distance, weight);
    try {
        const shipment = await pool.query(`
            INSERT INTO shipments (
            tracking_id,
            pickup_address,
            pickup_lat,
            pickup_lng,
            destination_address,
            destination_lat,
            destination_lng,
            weight,
            distance,
            amount,
            customer_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             RETURNING *
             `, 
             [
            tracking_id,
            pickup_address,
            pickup_lat,
            pickup_lng,
            destination_address,
            destination_lat,
            destination_lng,
            weight,
            distance,
            amount,
            req.user.id
        ]);
        return res.status(201).json({
            message: "Shipment created successfully",
            shipment: shipment.rows[0]
        });
    } catch (error){
        console.log("CREATE SHIPMENT ERROR", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


module.exports = {createShipment};
