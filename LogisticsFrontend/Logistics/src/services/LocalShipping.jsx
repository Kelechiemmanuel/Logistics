import React, { useState } from "react";
import API from "../api/api";

const LocalShipping = () => {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const totalSteps = 5;

  const [form, setForm] = useState({
    service_type: "",
    pickup_address: "",
    destination_address: "",
    weight: "",
    distance: ""
  });

  // Progress bar
  const ProgressBar = () => (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm mb-2">
        <span>Step {step} of {totalSteps}</span>
        <span>{Math.round((step / totalSteps) * 100)}%</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // FINAL API CALL
  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...form,
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
        destination_address: "",
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

      {/* PROGRESS BAR */}
      <ProgressBar />

      {message && (
        <p className="mb-4 text-green-600 font-medium">
          {message}
        </p>
      )}

      {/* STEP 1 - SELECT SERVICE */}
      {step === 1 && (
  <div>
    <h2 className="text-xl mb-4">Select Vehicle</h2>

    {["motorcycle", "minibus", "lorry", "truck"].map((v) => (
      <button
        key={v}
        className={`border p-3 w-full mb-2 ${
          form.vehicle === v ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => {
          setForm({ ...form, vehicle: v });
          setStep(2);
        }}
      >
        {v.toUpperCase()}
      </button>
    ))}
  </div>
)}
      {step === 2 && (
        <div>
          <h2 className="text-xl mb-4">Select Delivery Type</h2>

          <button
            className="border p-3 w-full mb-3"
            onClick={() => {
              setForm({ ...form, service_type: "standard" });
              setStep(2);
            }}
          >
            Standard Delivery
          </button>

          <button
            className="border p-3 w-full"
            onClick={() => {
              setForm({ ...form, service_type: "express" });
              setStep(2);
            }}
          >
            Express Delivery
          </button>
        </div>
      )}

      {/* STEP 2 - ADDRESSES */}
      {step === 3 && (
        <div>
          <h2 className="text-xl mb-4">Pickup & Delivery</h2>

          <input
            name="pickup_address"
            placeholder="Pickup Address"
            value={form.pickup_address}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />

          <input
            name="destination_address"
            placeholder="Destination Address"
            value={form.destination_address}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />

          <div className="flex justify-between">
            <button onClick={() => setStep(1)}>Back</button>
            <button onClick={() => setStep(3)}>Continue</button>
          </div>
        </div>
      )}

      {/* STEP 3 - REVIEW */}
      {step === 4 && (
        <div>
          <h2 className="text-xl mb-4">Review Shipment</h2>

          <p><b>Type:</b> {form.service_type}</p>
          <p><b>Pickup:</b> {form.pickup_address}</p>
          <p><b>Destination:</b> {form.destination_address}</p>

          <div className="flex justify-between mt-4">
            <button onClick={() => setStep(2)}>Back</button>
            <button onClick={() => setStep(4)}>Confirm</button>
          </div>
        </div>
      )}

      {/* STEP 4 - CONFIRM */}
      {step === 5 && (
        <div>
          <h2 className="text-xl mb-4">Confirm Shipment</h2>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Shipment"}
          </button>

          <button className="ml-3" onClick={() => setStep(3)}>
            Back
          </button>
        </div>
      )}

    </div>
  );
};

export default LocalShipping;