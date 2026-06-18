import React, { useEffect, useState } from 'react'
import API from '../api/api'
import { useNavigate } from 'react-router-dom'
import Spinner from '../util/Spinner'
import { Phone } from 'lucide-react'


const Account = () => {
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
const [form, setForm] = useState({
  fullname: "",
  email: "",
  phone: "",
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

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000);

    return () => clearTimeout(timer)
  }, [])

// if (loading) return <Spinner />
  return (
    <div className='flex justify-center items-center h-screen bg-[#f3f4f6] mt-15'>
    <div className='flex justify-center items-center md:w-[45%] w-full p-10'>
      <div className="flex flex-col gap-8 text-center w-full p-10 text-[#777d87] text-xl">
        <h2 className='text-4xl font-bold'>Register</h2>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, fullname: e.target.value })
          }
          className='outline-0 border border-[#777d87] bg-[#ffffff] p-4 w-full rounded-xl'
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className='outline-0 border border-[#777d87] bg-[#ffffff] p-4 w-full rounded-xl'
        />
        <input
          placeholder="Phone Number"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className='outline-0 border border-[#777d87] bg-[#ffffff] p-4 w-full rounded-xl'
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className='outline-0 border border-[#777d87] bg-[#ffffff] p-4 w-full rounded-xl'
        />

        <button className='bg-[#0a0a0a] text-[#ffffff] cursor-pointer outline-0 p-4 w-full rounded-xl' onClick={handleRegister}>Register</button>
        <p className='flex gap-3 justify-center items-center'>Already have an account
          <button onClick={() => navigate("/login")} className='cursor-pointer hover:text-green-500'>Login</button>
        </p> 
      </div>
    </div>
    </div>
  )
}

export default Account