import React, { useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react';

const questions = [
{
id: 1,
question: "what services do you offer?",
explanation: "How to Create an Effective Design PortfolioHow to Create an Effective Design Portfolio"
},
{
id: 2,
question: "what services do you offer?",
explanation: "How to Create an Effective Design PortfolioHow to Create an Effective Design Portfolio"
},
{
id: 3,
question: "what services do you offer?",
explanation: "How to Create an Effective Design PortfolioHow to Create an Effective Design Portfolio"
},
{
id: 4,
question: "what services do you offer?",
explanation: "How to Create an Effective Design PortfolioHow to Create an Effective Design Portfolio"
},
{
id: 5,
question: "what services do you offer?",
explanation: "How to Create an Effective Design PortfolioHow to Create an Effective Design Portfolio"
},
{
id: 5,
question: "what services do you offer?",
explanation: "How to Create an Effective Design PortfolioHow to Create an Effective Design Portfolio"
},
]

const AskedQuestions = () => {
const [active, setActive] = useState(null);

const handleClick = (id) => {
setActive(active === id ? null : id);
};
return (
<div className='px-5 md:px-20 bg-white mb-20'>
    <div className="px-5 md:px-1 pt-20 pb-10">
        <h1 className='text-[#093856] font-semibold text-2xl'>Frequently Asked <span className='text-[#ff5c00]'>Questions</span></h1>
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-2 bg-linear-to-t from-[#f0f0f0]/80 to-transparent gap-5 p-10 border border-[#093856] rounded-2xl'>
        {questions.map((item, index) => (
            <div key={item.index} className={`flex w-full justify-between flex-col my-2 p-5 border border-[#093856] rounded-xl`} onClick={() => handleClick(item.id)}>
                    <div className="flex w-full justify-between mb-5 cursor-pointer">
                        <p className="text-[# 093856]">{item.question}</p>
                        <ChevronDown className={`w-6 h-6 
                    ${active === item.id ? "rotate-180" : "text-[#093856]"}`} />
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${active === item.id ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                        <p className="">
                            {item.explanation}
                        </p>
                    </div>

            </div>
        ))}
    </div>
</div>
)
}

export default AskedQuestions