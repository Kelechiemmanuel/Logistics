import React, { useState } from 'react'
import API from '../api/api'

const AddDriver = () => {
    const[success, setSuccess] = useState("")
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
    })

    const handleSubmit = async() => {
        try {
            await API.post('/api/admin/drivers', form);
            setSuccess("Driver successfully added");
            setForm({
                fullname: "",
                email: "",
                phone: "",
                password: ""
            });
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className='flex justify-center items-center h-screen bg-black/80 mt-15'>
        <div className='flex justify-center items-center w-full md:w-[45%] p-10'>
        <div className='flex flex-col gap-8 text-center w-full p-10 text-[#777d87] text-xl'>
        {success && <p className='text-green-600'>{success}</p>}
        <input type="text" value={form.fullname} placeholder='Fullname'
        onChange={(e) => setForm({...form, fullname: e.target.value})}
         className='outline-0 border border-[#777d87] bg-[#ffffff] p-4 w-full rounded-xl'
        />

        <input type="text" value={form.email} placeholder='Email'
        onChange={(e) => setForm({...form, email: e.target.value})}
         className='outline-0 border border-[#777d87] bg-[#ffffff] p-4 w-full rounded-xl'
        />

        <input type="text" value={form.phone} placeholder='phone'
        onChange={(e) => setForm({...form, phone: e.target.value})}
         className='outline-0 border border-[#777d87] bg-[#ffffff] p-4 w-full rounded-xl'
        />

        <input type="password" value={form.password} placeholder='Password'
        onChange={(e) => setForm({...form, password: e.target.value})}
        />

        <button onClick={handleSubmit} className='bg-[#0a0a0a] text-[#ffffff] cursor-pointer outline-0 p-4 w-full rounded-xl'>Submit</button>
      </div>
      </div>
    </div>
  )
}

export default AddDriver