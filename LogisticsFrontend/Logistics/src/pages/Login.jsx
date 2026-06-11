import React, { useState } from 'react'
import API from '../api/api'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await API.post('api/auth/login', form);

            localStorage.setItem("token", resizeBy.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setTimeout(() => {
                if (res.data.user.role === "admin") {
                    navigate("/admin/dashboard")
                } else if (res.data.user.role === "driver") {
                    navigate("/driver/dashboard")
                } else if (res.data.user.role === "customer") {
                    navigate("/customer/dashboard")
                } else {
                    setSuccess("You are logged in")
                    navigate("/")
                }
            }, 3000);
        } catch (error) {
            console.log("Error in log in", error);
            setError(error.response?.data?.error)
            setError("Failed to login");
        }
    }
    return (
        <div className="p-20">
            <h2>Login</h2>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <input
                placeholder="Email"
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />

            <button onClick={handleLogin} className="cursor-pointer">Login</button>
        </div>
    )
}

export default Login