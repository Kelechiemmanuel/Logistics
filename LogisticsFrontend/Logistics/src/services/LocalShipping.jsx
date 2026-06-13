import React, { useState } from "react";
import API from "../api/api";
import { Bike, Bus, Truck, Package, MapPin, Navigation, Weight, Route } from "lucide-react";

const LocalShipping = () => {
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
    weight: "",
    distance: ""
  });

  const totalSteps = 6;

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
    <div className="p-10 bg-[#f3f4f6]">
      <div className="max-w-4xl mx-auto py-20">
        <h1 className="text-center text-4xl font-bold mb-10 text-[#000000]">We’re excited to serve you!</h1>
        <p>
          The KELSLOGIST is your on-demand delivery companion. It is specially built for fast and reliable pick-up/delivery service.
          KELSLOGIST is your most convenient means of sending items within and
          across cities. GIGGo eliminates the need to leave your home or comfort zone, trying to dispatch items for delivery.
        </p>
      </div>
      <div className="max-w-4xl mx-auto bg-[#ffffff] p-20">

        <ProgressBar />

        {message && (
          <p className="mb-4 text-green-600 font-medium">{message}</p>
        )}

        {/* STEP 1 - VEHICLE */}
        {step === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select Vehicle</h2>

            <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-2 gap-5">
              <div className="flex gap-2 justify-center items-center">
                <Navigation size={22} fill="black" />
                <input
                  name="pickup_address"
                  placeholder="Pickup Address"
                  onChange={handleChange}
                  className="border-0 p-2 w-full mb-2 bg-[#f3f4f6] rounded-sm"
                />
              </div>

              <div className="flex gap-2 justify-center items-center">
                <MapPin size={20} fill="black" />
                <input
                  name="destination_address"
                  placeholder="Destination Address"
                  onChange={handleChange}
                  className="border-0 p-2 w-full mb-2 bg-[#f3f4f6] rounded-sm"
                />
              </div>
              {/* <Compass className="text-gray-500" />
              <input
                name="pickup_lng"
                placeholder="Pickup Longitude"
                onChange={handleChange}
                className="border p-2 w-full mb-2"
              />

              <input
                name="destination_lat"
                placeholder="Destination Latitude"
                onChange={handleChange}
                className="border p-2 w-full mb-2"
              />

              <input
                name="pickup_lat"
                placeholder="Pickup Latitude"
                onChange={handleChange}
                className="border p-2 w-full mb-2"
              />

              <input
                name="destination_lng"
                placeholder="Destination Longitude"
                onChange={handleChange}
                className="border p-2 w-full mb-2"
              /> */}
            </div>
            <div className="flex justify-between items-center">
              <button onClick={() => setStep(2)} className="ml-3">Back</button>

              <button onClick={() => setStep(4)}>Continue</button>
            </div>
          </div>
        )}

        {/* STEP 4 - DETAILS */}
        {step === 4 && (
          <div>
            <h2 className="text-center py-5">Package Details</h2>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex gap-2 justify-center items-center">
                <Weight size={24} fill="black"/>
                <input
                  name="weight"
                  placeholder="Weight"
                  onChange={handleChange}
                  className="border-0 p-2 w-full mb-2 bg-[#f3f4f6] rounded-sm"
                />
              </div>

              <div className="flex gap-2 justify-center items-center">
                <Route size={24} fill="black"/>
                <input
                  name="distance"
                  placeholder="Distance"
                  onChange={handleChange}
                  className="border-0 p-2 w-full mb-2 bg-[#f3f4f6] rounded-sm"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(3)} className="ml-3">Back</button>
              <button onClick={() => setStep(5)}>Continue</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl mb-4">Review</h2>

            <p>Vehicle: {form.vehicle}</p>
            <p>Service: {form.service_type}</p>
            <p>Pickup: {form.pickup_address}</p>
            <p>Destination: {form.destination_address}</p>

            <div className="flex justify-between py-5">
              <button onClick={() => setStep(4)} className="ml-3">Back</button>
              <button onClick={() => setStep(6)} disabled={loading}>
                {loading ? "loading" : "Continue"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 - CONFIRM */}
        {step === 6 && (
          <div>
            <h2>Confirm Shipment</h2>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#000000] text-white px-4 py-2"
            >
              {loading ? "Creating..." : "Create Shipment"}
            </button>

            <button onClick={() => setStep(5)} className="ml-3">
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalShipping;