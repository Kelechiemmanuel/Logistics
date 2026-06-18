import { X } from 'lucide-react';
import React, { useState } from 'react'

const Contacts = () => {
  const [pop, setPop] = useState(false);
  return (
    <div>
      {pop && (
        <div className='absolute inset-0 z-0 bg-black/80'>
        <div className='fixed z-0 text-white flex justify-center items-center h-full'>
        <div className=''>
          <p >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, recusandae.
          </p>
          <X size={24} onClick={() => setPop(false)}/>
        </div>
        </div>
        </div>
      )}
      <button onClick={() => setPop(!pop)}>
        {pop ? <X /> : "Pop-up"}
      </button>
    </div>
  )
}

export default Contacts