const pool = require('../config/db');

//GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        return res.status(200).json({
            message: "Users fetched successfully",
            users: users.rows
        });
    }catch (error) {
        console.log("GET ALL USERS ERROR", error);
        return res.status(500).json({
            message: "Fail to fetch users"
        });
    };
};

//GET ALL SHIPMENTS
const getAllShipments = async (req, res) => {
    try {
        const allShipments = await pool.query('SELECT * FROM shipments');
        return res.status(200).json({
            message: "Shipments fetched successfully",
            shipments: allShipments.rows
        });
    } catch (error){
        console.log("GET ALL SHIPMENTS ERROR", error);
        return res.status(500).json({
            message: "Fail to fetch shipments"
        });
    };
};

//DELETE A SHIPMENT
const deleteShipment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedShipment = await pool.query('DELETE FROM shipments WHERE id = $1 RETURNING *', [id]);
        return res.status(200).json({
            message: "Shipment deleted successfully",
            deleteShipment: deletedShipment.rows[0]
        });
    } catch (error) {
        console.log("DELETE SHIPMENT ERROR", error);
        return res.status(500).json({
            message: "Fail to delete shipment"
        });
    };
};


//ASSIGN DRIVER
const assignDriver = async (req, res) => {
    const { shipmentId, driverId } = req.body;

    try {
        const result = await pool.query(
            `UPDATE shipments
             SET driver_id = $1,
                 status = 'assigned'
             WHERE id = $2
             RETURNING *`,
            [driverId, shipmentId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Shipment not found"
            });
        }

        return res.status(200).json({
            message: "Driver assigned successfully",
            shipment: result.rows[0]
        });

    } catch (error) {
        console.log("ASSIGN DRIVER ERROR", error);

        return res.status(500).json({
            message: "Assigning driver failed"
        });
    }
};

module.exports = { assignDriver };

module.exports = {
    getAllUsers,
    getAllShipments,
    deleteShipment,
    assignDriver
}