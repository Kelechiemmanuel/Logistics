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
            const res = await API.post('api/auth/login', form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            const role = res.data.user.role?.toLowerCase().trim();

            if (role === "admin") {
                navigate("/admin/dashboard");
            }
            else if (role === "driver") {
                navigate("/driver/dashboard");
            }
            else if (role === "customer") {
                navigate("/customer/dashboard");
            }
            else {
                navigate("/");
            }
        } catch (error) {
            console.log("Error in log in", error);
            setError(error.response?.data?.error)
            setError("Failed to login");
        }
    }
    return (
    <div className='flex justify-center items-center h-screen'>
    <div className='flex justify-center items-center bg-[#3447AA] w-[50%] p-10'>
      <div className=" flex flex-col gap-5 text-center shadow-2xl w-full p-10 text-[#FBEAEB]">
        <h2>Login</h2>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className='outline-0 border-b-2 border-b-[#FBEAEB] p-5 w-full'
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className='outline-0 border-b-2 border-b-[#FBEAEB] p-5'
        />

        <button className='cursor-pointer' onClick={handleLogin}>Login</button>
        <p className='flex gap-3 justify-center items-center'>Already have an account
          <button className='cursor-pointer hover:text-green-500' onClick={() => navigate("/account")}>Register</button>
        </p> 
      </div>
    </div>
    </div>

    )
}

export default Login