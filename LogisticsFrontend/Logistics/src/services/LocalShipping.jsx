import React, { useState } from "react";
import API from "../api/api";

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

  const totalSteps = 5;

  const ProgressBar = () => (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm mb-2">
        <span>Step {step} of {totalSteps}</span>
        <span>{Math.round((step / totalSteps) * 100)}%</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-blue-600 h-2 rounded-full"
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

    // ✅ validation before sending
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

  return (
    <div className="p-10 max-w-2xl mx-auto">

      <ProgressBar />

      {message && (
        <p className="mb-4 text-green-600 font-medium">{message}</p>
      )}

      {/* STEP 1 - VEHICLE */}
      {step === 1 && (
        <div>
          <h2>Select Vehicle</h2>

          {["motorcycle", "minibus", "lorry", "truck"].map((v) => (
            <button
              key={v}
              onClick={() => {
                setForm({ ...form, vehicle: v });
                setStep(2);
              }}
              className="border p-3 w-full mb-2"
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* STEP 2 - SERVICE */}
      {step === 2 && (
        <div>
          <h2>Select Service</h2>

          <button onClick={() => {
            setForm({ ...form, service_type: "standard" });
            setStep(3);
          }} className="border p-3 w-full mb-2">
            Standard
          </button>

          <button onClick={() => {
            setForm({ ...form, service_type: "express" });
            setStep(3);
          }} className="border p-3 w-full">
            Express
          </button>
        </div>
      )}

      {/* STEP 3 - ADDRESS */}
      {step === 3 && (
        <div>
          <h2>Pickup & Destination</h2>

          <input
            name="pickup_address"
            placeholder="Pickup Address"
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
            name="pickup_lng"
            placeholder="Pickup Longitude"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />

          <input
            name="destination_address"
            placeholder="Destination Address"
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
            name="destination_lng"
            placeholder="Destination Longitude"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />

          <button onClick={() => setStep(4)}>Continue</button>
        </div>
      )}

      {/* STEP 4 - DETAILS */}
      {step === 4 && (
        <div>
          <h2>Package Details</h2>

          <input
            name="weight"
            placeholder="Weight"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />

          <input
            name="distance"
            placeholder="Distance"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />

          <button onClick={() => setStep(5)}>Continue</button>
        </div>
      )}

      {/* STEP 5 - CONFIRM */}
      {step === 5 && (
        <div>
          <h2>Confirm Shipment</h2>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2"
          >
            {loading ? "Creating..." : "Create Shipment"}
          </button>

          <button onClick={() => setStep(4)} className="ml-3">
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default LocalShipping;