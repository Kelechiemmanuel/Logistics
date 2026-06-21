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
    <div>
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
        />

        <input type="password" value={form.password} placeholder='Password'
        onChange={(e) => setForm({...form, password: e.target.value})}
        />

        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AddDriver