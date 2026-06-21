const pool = require('../config/db');
const bcrypt = require('bcryptjs')

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

const createDriver = async (req, res) => {
  const { fullname, email, phone, password } = req.body;

  try {
    if (!fullname || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // FIX: correct column (email not id)
    const existing = await pool.query(
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );

    if (existing.rows.length) {
      return res.status(400).json({
        message: "Driver already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // FIX: correct table name + role quotes
    const result = await pool.query(
      `
      INSERT INTO users (
        fullname,
        email,
        phone,
        password,
        role
      )
      VALUES ($1, $2, $3, $4, 'driver')
      RETURNING id, fullname, email, phone, role, created_at
      `,
      [fullname, email, phone, hashedPassword]
    );

    return res.status(201).json({
      message: "Driver created successfully",
      driver: result.rows[0]
    });

  } catch (error) {
    console.log("CREATE DRIVER ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


module.exports = {
    getAllUsers,
    getAllShipments,
    deleteShipment,
    assignDriver,
    createDriver
}