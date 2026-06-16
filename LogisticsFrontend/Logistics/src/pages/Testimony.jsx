import { useEffect, useState } from "react";
import doorImg from '../assets/door.jpg'

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
    <section className="px-5 md:px-20 pb-20">
      <div className="flex flex-col md:flex-row gap-5 p-10 border border-[#093856] rounded-2xl">
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
              <div className="rounded-xl text-center">
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

      <div className='bg-linear-to-t from-[#f0f0f0]/80 to-transparent px-10 py-10 rounded-2xl flex justify-center items-center'>
        <div>
          <h1 className='text-[#093856] text-center font-medium pb-5 text-2xl'>Our Services</h1>
          <p className='text-[#093856]'>
            With a global shipping reputation for handling every last detail of our customers' particular logistics and forwarding needs, 
            Fortune Global's team of expert professionals take care of all your logistics. If you're searching for shipping companies in Nigeria or
             logistics company in Nigeria, Fortune Global should be your one stop destination.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Testimonials;