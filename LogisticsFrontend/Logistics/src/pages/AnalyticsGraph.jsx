import { useEffect, useState } from "react";
import API from "../api/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const AnalyticsGraph = () => {
  const [shipmentData, setShipmentData] = useState([]);
  const [deliveryData, setDeliveryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/admin/analytics")
      .then((res) => {
        const data = res.data;

        setShipmentData(data?.shipmentTrend || []);
        setDeliveryData(data?.deliveryStatus || []);
      })
      .catch((err) => {
        console.log("Analytics error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="h-72 bg-gray-200 animate-pulse rounded-xl" />
        <div className="h-72 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">

      {/* Shipment Trend */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-5">
          Shipment Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={shipmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Delivery Status */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-5">
          Delivery Status
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={deliveryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="count"
              fill="#16a34a"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AnalyticsGraph;