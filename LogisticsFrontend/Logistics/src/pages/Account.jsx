import React, { useState } from 'react'
import API from '../api/api'
import { useNavigate } from 'react-router-dom'


const Account = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post('api/auth/register', form)
      setSuccess("Account created successfully")
      navigate("/login")
    } catch (error) {
      console.log("Register error", error);
      setError(error.response?.data?.error)
      setError("Failed to register");

    }
  }


  return (
    <div>
      <div className="p-20">
        <h2>Register</h2>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, fullname: e.target.value })
          }
        />

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

        <button onClick={handleRegister}>Register</button>
        <p>Already have an account</p> 
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  )
}

export default Account