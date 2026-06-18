
import React from 'react'


const steps = ["packed", "in_transit", "delivered"];

const ProgressiveBar = () => {
      const currentIndex = steps.indexOf(status);
  return (
    <div>
    <div className="flex items-center justify-between w-full mt-4">

      {steps.map((step, index) => {
        const isActive = index <= currentIndex;

        return (
          <div key={step} className="flex-1 flex items-center w-full">

            {/* Circle */}
            <div
              className={`w-4 h-4 rounded-full ${
                isActive ? "bg-green-500" : "bg-gray-300"
              }`}
            />

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  index < currentIndex ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}

    </div>
    </div>
  )
}

export default ProgressiveBar