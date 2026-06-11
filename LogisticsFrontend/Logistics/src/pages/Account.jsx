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
    <div className='flex justify-center items-center h-screen'>
    <div className='flex justify-center items-center bg-[#3447AA] w-[50%] p-10'>
      <div className=" flex flex-col gap-5 text-center shadow-2xl w-full p-10 text-[#FBEAEB]">
        <h2>Register</h2>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, fullname: e.target.value })
          }
          className='outline-0 border-b-2 border-b-[#FBEAEB] p-5'
        />

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

        <button className='cursor-pointer' onClick={handleRegister}>Register</button>
        <p className='flex gap-3 justify-center items-center'>Already have an account
          <button onClick={() => navigate("/login")} className='cursor-pointer hover:text-green-500'>Login</button>
        </p> 
      </div>
    </div>
    </div>
  )
}

export default Account