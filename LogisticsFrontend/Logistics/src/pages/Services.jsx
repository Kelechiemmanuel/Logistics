import React, { useState } from 'react';
import doorImg from '../assets/door.jpg';
import downloadImg from '../assets/download.webp';
import commerceImg from '../assets/commerce.webp';
import fastImg from '../assets/fast.jpg';
import HaulageImg from '../assets/Haulage.jpg';
import mailroomImg from '../assets/mailroom.jpg';
import wareIMG from '../assets/ware.jpg';


const Services = () => {

  const service = [
    {
      id: 1,
      title: "Last-Mile Delivery",
      desc: "Need your package delivered to your doorstep? We will ship it! At GIG Logistics, we handle the final stretch so you don't have to stress. Our last-mile delivery service covers over 18 states across Nigeria, and goes even further, reaching doorsteps in the UK, USA, Canada, and Ghana.",
      image: doorImg
    },
    {
      id: 2,
      title: "GoFaster",
      desc: "Enjoy the speed of GoFaster Interstate shipping service. Send items across Lagos, Abuja, Port Harcourt, Kano, Benin, Ilorin, Ibadan, Uyo, Calabar, Owerri, Enugu, Kaduna, Yola, Sokoto and Jos and receive them in 24 - 48 hours",
      image: fastImg
    },
    {
      id: 3,
      title: "KelsAPP",
      desc: "App puts the power of logistics in your hands, making it easy to ship, pay, track, schedule, and manage deliveries. Request item pickup and delivery across Nigeria and Ghana from the comfort of your home or office. Shop from UK, USA, Canada, and China stores and have your items shipped to Nigeria or Ghana.",
      image: downloadImg
    },
    {
      id: 4,
      title: "E-commerce",
      desc: "Kels Logistics drives seamless e-commerce with smart, reliable delivery solutions for every business owner. From Payment on Delivery with no handling fees to API integration, insurance cover, and the GIGGo Wallet, we simplify shipping. Grow, scale, and satisfy your customers — partner with us to deliver beyond expectations",
      image: commerceImg
    },
    {
      id: 5,
      title: "Mailroom Services",
      desc: "Kels Mailroom Service puts you in decisive control of correspondence. Transform mail handling by outsourcing all sorting, tracking, and distribution. We provide secure, on/off-site processing, ensuring total digital audit trails and guaranteed compliance for every document.",
      image: mailroomImg
    },
    {
      id: 6,
      title: "Haulage",
      desc: "Kels Logistics Haulage provides strategic, end-to-end bulk transportation across Nigeria and West Africa. We deliver guaranteed and cost-effective movement of your high-volume goods and critical assets. Our service is backed by a specialised fleet, real-time tracking, and proven expertise.",
      image: HaulageImg
    },
    {
      id: 7,
      title: "Warehousing",
      desc: "Kels Logistics provides secure, strategic warehousing and fulfillment engineered for high growth. Leverage our multi-location hubs and real-time visibility to cut costs and streamline your entire supply chain.",
      image: wareIMG
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(prev =>
      prev === 0 ? service.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex(prev =>
      prev === service.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className='overflow-hidden px-5 md:px-20 py-15'>
      <div className='flex flex-col lg:flex-row justify-center items-center gap-10 p-5 px-5 md:px:10 lg:px-25 border border-[#BDD9D7] rounded-2xl'>
        <div className='bg-linear-to-t from-[#093856]/80 to-transparent border border-[#BDD9D7] px-0 md:px-10 py-10 rounded-2xl flex justify-center items-center'>
        <div>
        <h1 className='text-[#093856] text-center font-semibold pb-5 text-2xl'>Our <span className='text-[#ff5c00]'>Services</span></h1>
          <p className='bg-linear-to-t from-[#093856]/80 to-transparent px-5 md:px-10 py-10 rounded-2xl text-[#BDD9D7]'>
            With a global shipping reputation for handling every last detail of our customers' particular logistics and forwarding needs, Fortune Global's team of expert professionals take care of all your logistics. If you're searching for shipping companies in Nigeria or logistics company in Nigeria, Fortune Global should be your one stop destination.
          </p>
        </div>
        </div>
        <div className='max-w-xl bg-linear-to-b from-[#093856]/80 to-transparent border border-[#BDD9D7] md:px-10 px-0 py-3 rounded-2xl'>
          <div className='bg-linear-to-t from-[#093856]/80 to-transparent px-10 py-3 rounded-2xl'>
            <h1 className='font-medium pt-5 text-2xl text-[#093856]'>{service[currentIndex].title}</h1>
            <p className='py-5 text-[#BDD9D7]'>{service[currentIndex].desc}</p>
            <div className='flex justify-center items-center bg-[#efeef7] py-6 md:px-10 px-2 rounded-xl'>
              <img src={service[currentIndex].image} alt={service[currentIndex].image} className='w-80 h-50 object-cover rounded-2xl' />
            </div>
          </div>

          <div className='flex justify-between pt-5'>
            <button onClick={prevSlide} className="h-10 w-10 flex items-center cursor-pointer justify-center border border-[#093856] text-[#BDD9D7] rounded-full hover:bg-[#093856] transition">
              &#8592;
            </button>

            <button
              onClick={nextSlide}
              className="h-10 w-10 flex items-center justify-center cursor-pointer border border-[#093856] text-[#BDD9D7] rounded-full hover:bg-[#093856] transition">
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services