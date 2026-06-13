const pool = require('../config/db');
const generateTrackingId = require('../util/generateTrackingId');
const { calculatePrice } = require('../Services/pricingService');


const createShipment = async (req, res) => {
    const {
        vehicle,
        service_type,
        pickup_address,
        pickup_lat,
        pickup_lng,
        destination_address,
        destination_lat,
        destination_lng,
        receiver_address,
        receiver_phone,
        weight,
        distance
    } = req.body;

    try {

        const customer = await pool.query(`
            SELECT fullname, phone FROM users
            WHERE id=$1
            `, [req.user.id]);

        if (customer.rows.length === 0) {
            return res.status(400).json({
                message: "Customer not found"
            })
        }
        const customer_name = customer.rows[0].fullname;
        const customer_phone = customer.rows[0].phone;
        const tracking_id = generateTrackingId();
        const amount = calculatePrice(distance, weight);
        const shipment = await pool.query(`
  INSERT INTO shipments (
        tracking_id,
        customer_id,
        customer_name,
        customer_phone,
        vehicle,
        service_type,
        pickup_address,
        pickup_lat,
        pickup_lng,
        destination_address,
        destination_lat,
        destination_lng,
        receiver_address,
        receiver_phone,
        weight,
        distance,
        amount
  ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13, $14, $15, $16, $17)
  RETURNING *
`, [
            tracking_id,
            req.user.id,
            customer_name,
            customer_phone,
            vehicle,
            service_type,
            pickup_address,
            pickup_lat,
            pickup_lng,
            destination_address,
            destination_lat,
            destination_lng,
            receiver_address,
            receiver_phone,
            weight,
            distance,
            amount

        ]);
        return res.status(201).json({
            message: "Shipment created successfully",
            shipment: shipment.rows[0]
        });
    } catch (error) {
        console.log("CREATE SHIPMENT ERROR", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


module.exports = { createShipment };
