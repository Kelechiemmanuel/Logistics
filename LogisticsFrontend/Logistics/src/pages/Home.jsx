import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Plane, Ship } from "lucide-react";

import truckImg from "../assets/truck.jpg";
import planeImg from "../assets/plane.jpg";
import shipImg from "../assets/ship.jpg";
import TrackShipment from "./TrackShipment";
import PartnerShip from "./PartnerShip";
import Count from "./Count";
import Services from "./Services";

const slides = [
  {
    image: truckImg,
    icon: Truck,
    title: "Road Freight",
    subtitle: "Fast, seamless last mile nationwide delivery, right to your doorstep.",
  },
  {
    image: planeImg,
    icon: Plane,
    title: "Air Freight",
    subtitle: "Express international shipping in the best hand, right tools and safety standard.",
  },
  {
    image: shipImg,
    icon: Ship,
    title: "Sea Freight",
    subtitle: "Delivering the future of global logistics with speed and precision.",
  },
  // {
  //   image: warehouse,
  //   icon: Warehouse,
  //   title: "Warehousing",
  //   subtitle: "Delivering the future of global logistics with speed and precision.",
  // },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const changeSlide = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const ActiveIcon = slides[current].icon;

  return (
    <section>
      <div className="relative w-full h-screen overflow-hidden">

      {/* 🌍 SMOOTH BACKGROUND SLIDE */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={slides[current].image}
          initial={{ opacity: 0.6, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.6, scale: 1.05 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[#093856]/80" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-5">

        {/* ICON */}
        <motion.div
          key={current + "-icon"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ActiveIcon size={50} className="text-[#BDD9D7] mb-4" />
        </motion.div>

        {/* TITLE */}
        <motion.h1
          key={current + "-title"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-[#BDD9D7]"
        >
          {slides[current].title}
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          key={current + "-sub"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-[#BDD9D7]"
        >
          {slides[current].subtitle}
        </motion.p>

        {/* CTA */}
        <button className="mt-8 px-6 py-3 bg-[#BDD9D7] text-[#093856] rounded-full">
          Discover More
        </button>

        {/* 🚚 CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mt-10 w-full max-w-4xl">

          {slides.map((item, index) => {
            const Icon = item.icon;
            const isActive = current === index;

            return (
              <motion.div
                key={index}
                onClick={() => changeSlide(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  cursor-pointer flex flex-col items-center p-6 rounded-xl group
                  transition
                  ${isActive ? "bg-white/20" : "bg-white/5"}
                `}
              >
                <Icon size={40} className="text-[#BDD9D7]" />
                <h3 className="mt-4 font-bold text-[#BDD9D7]">
                  {item.title}
                </h3>
              </motion.div>
            );
          })}

        </div>

        {/* DOTS */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index ? "bg-white scale-125" : "bg-gray-500"
              }`}
            />
          ))}
        </div>

      </div>
      </div>
      <div>
        <PartnerShip />
      </div>
      <div className="">
        <TrackShipment />
      </div>
      <div>
        <Count />
      </div>
      <div>
        <Services />
      </div>
      
    </section>
  );
}