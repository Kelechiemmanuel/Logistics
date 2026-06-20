import React, { useEffect, useState } from 'react'
import API from '../api/api'
import { useNavigate } from 'react-router-dom';
import Spinner from '../util/Spinner';


const Login = () => {
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoad] = useState(false);
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
        } finally {
          setLoading(false)
        }
    }

    useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false)
      }, 2000);
      return() => clearTimeout(timer)
    }, [])

    // if(loading) return <Spinner />
    return (
    <div className='flex justify-center items-center h-screen bg-[#f3f4f6] mt-15'>
    <div className='flex justify-center items-center w-full md:w-[45%] p-10'>
      <div className=" flex flex-col gap-8 text-center w-full p-10 text-[#777d87] text-xl">
        <h2 className='text-4xl font-bold'>Login</h2>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
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
        <button className='bg-[#0a0a0a] text-[#ffffff] cursor-pointer outline-0 p-4 w-full rounded-xl' onClick={handleLogin}>
          {loading ? "loading" : "Login"}
        </button>
        <p className='flex gap-3 justify-center items-center'>Already have an account
          <button className='cursor-pointer hover:text-green-500' onClick={() => navigate("/account")}>Register</button>
        </p> 
      </div>
    </div>
    </div>

    )
}

export default Login