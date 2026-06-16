import React from 'react'

const Logo = () => {
    return (
        <div>
            <div className="flex items-center justify-center gap-2 animate-logo">
                <div className="flex items-center justify-center">
                    <div className="flex  justify-center items-baseline bg-[#093856] w-3 h-3 text-2xl"></div>
                    <div className="flex  justify-end items-center bg-[#093856] w-3 h-3 mt-5"></div>
                </div>
                <a href="#home">
                    <h1 className="font-semibold text-xl text-[#093856]">Kels Logistics</h1>
                </a>
            </div>
        </div>
    )
}

export default Logo