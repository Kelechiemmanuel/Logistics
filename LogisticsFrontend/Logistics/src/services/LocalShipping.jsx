  import React, { useState } from "react";
  import API from "../api/api";
  import { Bike, Bus, Truck, Package, MapPin, Navigation, Weight, Route } from "lucide-react";
  import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
  import "leaflet/dist/leaflet.css";

  // move map view when coords change
  function RecenterMap({ coords }) {
  const map = useMap();
  map.setView(coords);
  return null;
  }

  const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
  clearTimeout(timer);
  timer = setTimeout(() => fn(...args), delay);
  };
  };

  const searchLocation = async (query, setResults) => {
  if (!query || query.length < 3) {
  setResults([]);
  return;
  }

  const res = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
  );

  const data = await res.json();
  setResults(data);
  };

  const LocalShipping = () => {
  const [pickupCoords, setPickupCoords] = useState([6.5244, 3.3792]);
  const [destCoords, setDestCoords] = useState([6.5244, 3.3792]);

  const [pickupResults, setPickupResults] = useState([]);
  const [destResults, setDestResults] = useState([]);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
  vehicle: "",
  service_type: "",
  pickup_address: "",
  pickup_lat: "",
  pickup_lng: "",
  destination_address: "",
  destination_lat: "",
  destination_lng: "",
  receiver_address: "",
  receiver_phone: "",
  receiver_name: "",
  receiver_address_2: "",
  sender_address_2: "",
  weight: "",
  distance: ""
  });
  const user = JSON.parse(localStorage.getItem("user"));

  const totalSteps = 7;

  const ProgressBar = () => (
  <div className="w-full mb-6">
  <div className="flex justify-between text-sm mb-2">
  <span>Step {step} of {totalSteps}</span>
  <span>{Math.round((step / totalSteps) * 100)}%</span>
  </div>

  <div className="w-full bg-gray-200 h-2 rounded-full">
  <div
  className="bg-[#000000] h-2 rounded-full"
  style={{ width: `${(step / totalSteps) * 100}%` }}
  />
  </div>
  </div>
  );

  const handlePickupSearch = debounce((value) => {
  searchLocation(value, setPickupResults);
  }, 500);

  const handleDestSearch = debounce((value) => {
  searchLocation(value, setDestResults);
  }, 500);

  const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  setLoading(true);
  setMessage("");

  if (
  !form.vehicle ||
  !form.service_type ||
  !form.pickup_address ||
  !form.destination_address ||
  !form.receiver_phone ||
  !form.receiver_name ||
  !form.weight ||
  !form.distance
  ) {
  setMessage("Please fill all required fields");
  setLoading(false);
  return;
  }

  try {
  const payload = {
  ...form,
  pickup_lat: Number(form.pickup_lat),
  pickup_lng: Number(form.pickup_lng),
  destination_lat: Number(form.destination_lat),
  destination_lng: Number(form.destination_lng),
  weight: Number(form.weight),
  distance: Number(form.distance)
  };

  const res = await API.post("/api/shipments/create", payload);

  const trackingId = res.data.shipment.tracking_id;

  setMessage(`Shipment created successfully. Tracking ID: ${trackingId}`);

  setStep(1);
  setForm({
  vehicle: "",
  service_type: "",
  pickup_address: "",
  pickup_lat: "",
  pickup_lng: "",
  destination_address: "",
  destination_lat: "",
  destination_lng: "",
  receiver_address: "",
  receiver_phone: "",
  receiver_name: "",
  receiver_address_2: "",
  sender_address_2: "",
  weight: "",
  distance: ""
  });

  } catch (error) {
  setMessage(error.response?.data?.message || "Shipment failed");
  } finally {
  setLoading(false);
  }
  };

  const vehicles = [
  {
  type: "motorcycle",
  icon: <Bike size={28} />,
  },
  {
  type: "minibus",
  icon: <Bus size={28} />,
  },
  {
  type: "lorry",
  icon: <Package size={28} />,
  },
  {
  type: "truck",
  icon: <Truck size={28} />,
  },
  ];

  return (
  <div className="pt-24">
  <>
  <div className="p-10 bg-[#f3f4f6] flex justify-center lg:flex-row flex-col items-center gap-5 lg:items-start w-full h-full">
  <div className="bg-[#ffffff] p-5 lg:w-[20%] w-full h-50 md:mt-20 mt-5 rounded-lg">
  <p>
  Lorem ipsum, dolor sit amet consectetur adipisicing.
  </p>
  </div>
  <div className="lg:w-[80%] w-full">
  <div className="max-w-5xl mx-auto py-10">
  <div className="">
  <h1 className="text-center text-xl md:text-4xl font-bold mb-10 text-[#000000]">We are excited to serve you!</h1>
  <p className="text-sm text-center md:text-[15px]">
    The KELSLOGIST is your on-demand delivery companion. It is specially built for fast and reliable pick-up/delivery service.
    KELSLOGIST is your most convenient means of sending items within and
    across cities. Kels Logistics eliminates the need to leave your home or comfort zone, trying to dispatch items for delivery.
  </p>
  </div>
  </div>
  <div className="max-w-5xl mx-auto bg-[#ffffff] p-5 rounded-xl">

  <ProgressBar />

  {message && (
  <p className="mb-4 text-green-600 font-medium">{message}</p>
  )}

  {/* STEP 1 - VEHICLE */}
  {step === 1 && (

  <div className="bg-white p-6 rounded-lg">
    <h2 className="text-xl font-semibold mb-4">Select Vehicle</h2>

    <div className="grid md:grid-cols-2 gap-4">
      {vehicles.map((v) => (
        <button
          key={v.type}
          onClick={() => {
            setForm({ ...form, vehicle: v.type });
            setStep(2);
          }}
          className={`border p-5 flex flex-col items-center justify-center gap-2 rounded-lg transition
  ${form.vehicle === v.type
              ? "bg-[#000000] text-white"
              : "hover:bg-gray-100"
            }`}
        >
          {v.icon}
          <span className="capitalize">{v.type}</span>
        </button>
      ))}
    </div>
  </div>
  )}

  {/* STEP 2 - SERVICE */}
  {step === 2 && (
  <div>
    <div className="flex w-[58%] justify-between py-5">
      <button onClick={() => setStep(1)} className="ml-3">Back</button>
      <h2 className="text-center">Select Service</h2>
    </div>

    <button onClick={() => {
      setForm({ ...form, service_type: "standard" });
      setStep(3);
    }} className="border p-3 w-full mb-2 outline-0 border-[#777d87] bg-[#ffffff] rounded-xl">
      Standard
    </button>

    <button onClick={() => {
      setForm({ ...form, service_type: "express" });
      setStep(3);
    }} className="border p-3 w-full border-[#777d87] bg-[#ffffff] rounded-xl">
      Express
    </button>
  </div>
  )}

  {/* STEP 3 - ADDRESS */}
  {step === 3 && (
  <div>
    <h2 className="text-center py-5">Pickup & Destination</h2>

    {/* MAP PREVIEW */}
    <div className="mb-5">
      <MapContainer
        center={pickupCoords}
        zoom={12}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"/>

        <Marker position={pickupCoords} />
        <Marker position={destCoords} />

        <RecenterMap coords={pickupCoords} />
      </MapContainer>
    </div>

    <div className="grid md:grid-cols-2 gap-5">

      {/* PICKUP */}
      <div className="relative">
        <div className="flex gap-2 items-center">
          <Navigation size={22} />
          <input
            name="pickup_address"
            placeholder="Pickup Address"
            value={form.pickup_address}
            onChange={(e) => {
              handleChange(e);
              handlePickupSearch(e.target.value);
            }}
            className="border-0 p-2 w-full bg-[#f3f4f6] rounded-sm"
          />
        </div>

        {/* suggestions */}
        {pickupResults.length > 0 && (
          <div className="absolute bg-white border w-full z-10">
            {pickupResults.slice(0, 5).map((item, i) => (
              <div
                key={i}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setForm((prev) => ({
                    ...prev,
                    pickup_address: item.display_name,
                    pickup_lat: item.lat,
                    pickup_lng: item.lon,
                  }));

                  setPickupCoords([item.lat, item.lon]);
                  setPickupResults([]);
                }}
              >
                {item.display_name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DESTINATION */}
      <div className="relative">
        <div className="flex gap-2 items-center">
          <MapPin size={20} />

          <input
            name="destination_address"
            placeholder="Destination Address"
            value={form.destination_address}
            onChange={(e) => {
              handleChange(e);
              handleDestSearch(e.target.value);
            }}
            className="border-0 p-2 w-full bg-[#f3f4f6] rounded-sm"
          />
        </div>


        {/* suggestions */}
        {destResults.length > 0 && (
          <div className="absolute bg-white border w-full z-10">
            {destResults.slice(0, 5).map((item, i) => (
              <div
                key={i}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setForm((prev) => ({
                    ...prev,
                    destination_address: item.display_name,
                    destination_lat: item.lat,
                    destination_lng: item.lon,
                  }));

                  setDestCoords([item.lat, item.lon]);
                  setDestResults([]);
                }}
              >
                {item.display_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* NAV */}
    <div className="flex justify-between items-center mt-5">
      <button onClick={() => setStep(2)}>Back</button>
      <button onClick={() => setStep(4)}>Continue</button>
    </div>
  </div>
  )}

  {step === 4 && (
  <div>
    <h2 className="text-center py-5">Sender's Details</h2>

    <div className="grid md:grid-cols-2 gap-5">
      <div className="w-full">
        <p>Address 1</p>
        <p className="border-0 p-2 h-20 w-full mb-2 bg-[#f3f4f6] rounded-sm flex items-center justify-start">{form.pickup_address}</p>
      </div>
      <div>
        <p>Address 2</p>
        <input
          name="sender_address_2"
          placeholder="Address 2 (Optional)"
          onChange={handleChange}
          className="border-0 p-2 w-full h-20 mb-2 bg-[#f3f4f6] rounded-sm"
        />
      </div>
      <div>
        <p>Sender's Name</p>
        <p className="border-0 p-2 h-20 w-full mb-2 bg-[#f3f4f6] rounded-sm flex items-center justify-start">{user.fullname}</p>
      </div>
      <div>
        <p>Sender's Number</p>
        <p className="border-0 p-2 h-20 w-full mb-2 bg-[#f3f4f6] rounded-sm flex items-center justify-start">{user.phone}</p>
      </div>
    </div>

    <div className="py-10">
      <h1 className="text-center py-5">Receiver's Details</h1>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="w-full">
          <p>Address 1</p>
          <p className="border-0 p-2 h-20 w-full mb-2 bg-[#f3f4f6] rounded-sm flex items-center justify-star">{form.destination_address}</p>
        </div>
        <div>
          <p>Address 2</p>
          <input
            name="receiver_address_2"
            placeholder="Address 2 (Optional)"
            onChange={handleChange}
            className="border-0 p-2 w-full h-20 mb-2 bg-[#f3f4f6] rounded-sm"
          />
        </div>
        <div>
          <p>Receiver's Name</p>
          <input
            name="receiver_name"
            placeholder="Receiver's Name"
            onChange={handleChange}
            className="border-0 p-2 w-full h-20 mb-2 bg-[#f3f4f6] rounded-sm"
          />
        </div>
        <div>
          <p>Receiver's Number</p>
          <input
            name="receiver_phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="border-0 p-2 h-20 w-full mb-2 bg-[#f3f4f6] rounded-sm"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={() => setStep(3)} className="ml-3">Back</button>
        <button onClick={() => setStep(5)}>Continue</button>
      </div>
    </div>
  </div>
  )}

  {/* STEP 4 - DETAILS */}
  {step === 5 && (
  <div>
    <h2 className="text-center py-5">Package Details</h2>
    <div className="grid md:grid-cols-2 gap-5">
      <div className="flex gap-2 justify-center items-center">
        <Weight size={24} fill="black" />
        <input
          name="weight"
          placeholder="Weight"
          onChange={handleChange}
          className="border-0 p-2 w-full mb-2 bg-[#f3f4f6] rounded-sm"
        />
      </div>

      <div className="flex gap-2 justify-center items-center">
        <Route size={24} fill="black" />
        <input
          name="distance"
          placeholder="Distance"
          onChange={handleChange}
          className="border-0 p-2 w-full mb-2 bg-[#f3f4f6] rounded-sm"
        />
      </div>
    </div>
    <div className="flex justify-between">
      <button onClick={() => setStep(4)} className="ml-3">Back</button>
      <button onClick={() => setStep(6)}>Continue</button>
    </div>
  </div>
  )}

  {step === 6 && (
  <div>
    <h2 className="text-xl mb-4">Review</h2>

    <p>Vehicle: {form.vehicle}</p>
    <p>Service: {form.service_type}</p>
    <p>Pickup: {form.pickup_address}</p>
    <p>Destination: {form.destination_address}</p>

    <div className="flex justify-between py-5">
      <button onClick={() => setStep(5)} className="ml-3">Back</button>
      <button onClick={() => setStep(7)} disabled={loading}>
        {loading ? "loading" : "Continue"}
      </button>
    </div>
  </div>
  )}

  {/* STEP 5 - CONFIRM */}
  {step === 7 && (
  <div>
    <h2>Confirm Shipment</h2>

    <button
      onClick={handleSubmit}
      disabled={loading}
      className="bg-[#000000] text-white px-4 py-2"
    >
      {loading ? "Creating..." : "Create Shipment"}
    </button>

    <button onClick={() => setStep(6)} className="ml-3">
      Back
    </button>
  </div>
  )}
  </div>
  </div>
  </div>

  </>
  </div>
  );
  };

  export default LocalShipping;