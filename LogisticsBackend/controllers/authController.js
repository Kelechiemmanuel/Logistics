const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

//REGISTER A USER
const register = async (req, res) => {
    const { fullname, email, password } = req.body;

    // Checking if the input fields are empty
    if (!fullname || !email || !password) {
        return res.status(400).json({
            message: "Please fill in the fields"
        })
    }
    try {
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase().trim()]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(`
            INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *
        `, [fullname.toLowerCase().trim(), email.toLowerCase().trim(), hashedPassword]);
        return res.status(200).json({
            message: "User Created Successfully",
            user: result.rows[0]
        })
    } catch (error) {
        console.log("REGISTER ERROR", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    };
}

//LOGIN A USER
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill in the fields"
        });
    };
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({
            id: user.rows[0].id,
            fullname: user.rows[0].fullname,
            email: user.rows[0].email,
            role: user.rows[0].role
        },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.rows[0].id,
                email: user.rows[0].email,
                role: user.rows[0].role
            }

        })

    } catch (error) {
        console.log("LOGIN ERROR", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}



module.exports = { register, login };