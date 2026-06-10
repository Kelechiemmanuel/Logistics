const pool = require('../config/db');

//GET DRIVER ASSIGNED SHIPMENTS
const getAssignedShipments = async (req, res) => {
    const driverId = req.user.id;
    try{
        const driver = await pool.query('SELECT * FROM shipments WHERE driver_id = $1', [driverId]);
        return res.status(200).json({
            message: "Assigned shipment fetched successfully",
            driver: driver.rows
        })
    } catch (error) {
        console.log("GET ASSIGNED SHIPMENT ERROR", error);
        return res.status(500).json({
            message: "Failed to fetch assigned shipments"
        });
    };
};

//UPDATE STATUS
const updateShipmentStatus = async (req,res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updateStatus = await pool.query('UPDATE shipments SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
        return res.status(200).json({
            message: "Shipment status updated successfully",
            updateStatus: updateStatus.rows
        })
    } catch (error) {
        console.log("UPDATE SHIPMENT ERROR", error);
        return res.status(500).json({
            message: "Failed to update status"
        })
        
    }
}


module.exports = {
    getAssignedShipments,
    updateShipmentStatus
}