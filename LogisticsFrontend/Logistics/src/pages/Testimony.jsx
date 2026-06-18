import { useEffect, useState } from "react";
import doorImg from '../assets/door.jpg'
import shipping from '../assets/shipping.jpg'
import { Check, ShoppingCart } from 'lucide-react';

const users = [
  {
    name: "Joshua",
    title: "Amazing service. Highly recommended!",
    img: doorImg
  },
  {
    name: "Joshua",
    title: "Amazing service. Highly recommended!",
    img: doorImg
  },
  {
    name: "Joshua",
    title: "Amazing service. Highly recommended!",
    img: doorImg
  },
  {
    name: "Joshua",
    title: "Amazing service. Highly recommended!",
    img: doorImg
  },
  {
    name: "Joshua",
    title: "Amazing service. Highly recommended!",
    img: doorImg
  },
  {
    name: "Joshua",
    title: "Amazing service. Highly recommended!",
    img: doorImg
  },
  {
    name: "Joshua",
    title: "Amazing service. Highly recommended!",
    img: doorImg
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % users.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="">
      <>
        <div className="px-5 md:px-20 pb-20">
          <div className="flex flex-col md:flex-row gap-5 p-5 md:p-10 border border-[#093856] rounded-2xl">
            <div className="py-10 overflow-hidden rounded-2xl transition-transform duration-700 bg-linear-to-t from-[#f0f0f0]/90 to-transparent">
              <div
                className="flex transition-transform duration-700"
                style={{
                  transform: `translateX(-${current * 100}%)`,
                }}
              >
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="min-w-full flex justify-center items-center"
                  >
                    <div className="rounded-xl text-center p-3">
                      <div>
                        <img src={user.img} alt={user.img} className="rounded-2xl w-80 h-50 object-cover" />
                      </div>
                      <h2 className="text-xl font-bold mt-5">
                        {user.name}
                      </h2>

                      <p className="mt-3 text-gray-600">
                        {user.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* dots */}
              <div className="flex justify-center gap-2 mt-5">
                {users.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-3 h-3 rounded-full transition ${current === index
                      ? "bg-[#093856]"
                      : "bg-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>

            <div className='bg-linear-to-t from-[#f0f0f0]/80 to-transparent px-5 md:px-10 py-10 rounded-2xl flex justify-center items-center'>
              <div>
                <h1 className='text-[#093856] text-center font-semibold pb-5 text-2xl'>Our <span className="text-[#ff5c00]">Happy Clients</span></h1>
                <p className='text-[#093856]'>
                  With a global shipping reputation for handling every last detail of our customers' particular logistics and forwarding needs,
                  Fortune Global's team of expert professionals take care of all your logistics. If you're searching for shipping companies in Nigeria or
                  logistics company in Nigeria, Fortune Global should be your one stop destination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 z-0 bg-black/80"
          style={{
            backgroundImage: `
             linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.3)),
             url(${shipping})
          `}}
        />
        <div className="relative z-0 w-full px-5 md:px-20 py-20">
          <h1 className="text-[#f0f0f0] py-10 font-semibold text-2xl">
            Businesses That Thrive With <span className="text-[#ff5c00]">KELS Logistics</span>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="bg-[#040d13] text-[#f0f0f0] border border-[#f0f0f0] p-8 rounded-2xl">
              <div className="flex justify-center items-center border border-[#ff5c00] w-10 h-10 rounded-full">
                <ShoppingCart size={20} className="text-[#ff5c00]" />
              </div>
              <div className="flex items-center gap-3">
                <h1 className="font-semibold py-5">E-Commerce</h1>
                <Check className="text-[#ff5c00]" />
              </div>
              <div className="bg-[#14222a] p-5 rounded-2xl">
                <p>
                  KELS Logistics empowers online retailers with quick, reliable shipping, last-mile delivery,
                  and cash-on-delivery services. With nationwide coverage and seamless API integration,
                  e-commerce sellers can scale proficiently & provide an enhanced customer experience.
                </p>
              </div>
            </div>

            <div className="bg-[#2f546b] text-[#f0f0f0] border border-[#f0f0f0] p-8 rounded-2xl">
              <div className="bg-[#f0f0f0] flex justify-center items-center border border-[#f0f0f0] w-10 h-10 rounded-full">
                <ShoppingCart size={20} className="text-[#040d13]"/>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="font-semibold py-5">E-Commerce</h1>
                <Check className="text-[#f0f0f0]" />
              </div>
              <div className="bg-[#f0f0f0] p-5 rounded-2xl">
                <p className="text-[#093856]">
                  KELS Logistics empowers online retailers with quick, reliable shipping, last-mile delivery,
                  and cash-on-delivery services. With nationwide coverage and seamless API integration,
                  e-commerce sellers can scale proficiently & provide an enhanced customer experience.
                </p>
              </div>
            </div>


            <div className="bg-[#040d13] text-[#f0f0f0] border border-[#f0f0f0] p-8 rounded-2xl">
              <div className="flex justify-center items-center border border-[#ff5c00] w-10 h-10 rounded-full">
                <ShoppingCart size={20} className="text-[#ff5c00]" />
              </div>
              <div className="flex items-center gap-3">
                <h1 className="font-semibold py-5">E-Commerce</h1>
                <Check className="text-[#ff5c00]" />
              </div>
              <div className="bg-[#14222a] p-5 rounded-2xl">
                <p>
                  KELS Logistics empowers online retailers with quick, reliable shipping, last-mile delivery,
                  and cash-on-delivery services. With nationwide coverage and seamless API integration,
                  e-commerce sellers can scale proficiently & provide an enhanced customer experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;