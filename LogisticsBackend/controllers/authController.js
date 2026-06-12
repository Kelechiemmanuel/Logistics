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
   const { email, password } = req.body;

   if(!email || !password){
    return res.status(400).json({
        message: "Your fields are empty"
    })
   }
    try {
        const result = await pool.query("SELECT * FROM users  WHERE email = $1", [email]);
        const user = result.rows[0];
        if (!user) return res.status(400).json({
            error: "user not found"
        });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({
            error: "Invalid credentials"
        });

        const token = jwt.sign(
            {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        res.json({ token, user });
        console.log("DB USER:", user);
        console.log("ROLE FROM DB:", user.role);
    } catch (error) {
        console.error("LOGIN ERROR", error.message);
        res.status(500).json({
            error: "Server error"
        });
    };
}



module.exports = {register, login};