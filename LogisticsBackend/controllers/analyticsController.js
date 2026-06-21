const pool = require("../config/db");

const getAnalytics = async (req, res) => {
  try {
    // 1. SUMMARY CARDS
    const summaryResult = await pool.query(`
      SELECT
        COUNT(*) AS total_shipments,
        COALESCE(SUM(amount), 0) AS revenue,

        COUNT(*) FILTER (WHERE LOWER(status) = 'pending') AS pending,
        COUNT(*) FILTER (WHERE LOWER(status) = 'assigned') AS assigned,
        COUNT(*) FILTER (WHERE LOWER(status) = 'transit') AS transit,
        COUNT(*) FILTER (WHERE LOWER(status) = 'delivered') AS delivered
      FROM shipments;
    `);

    // 2. VOLUME TREND (WAVE LINE DATA)
    const volumeTrendResult = await pool.query(`
      SELECT
        TO_CHAR(DATE_TRUNC('day', created_at), 'DD Mon') AS date,
        COUNT(*)::int AS volume
      FROM shipments
      GROUP BY DATE_TRUNC('day', created_at)
      ORDER BY DATE_TRUNC('day', created_at);
    `);

    // 🔥 OPTIONAL: ADD GROWTH % FOR DASHBOARD INSIGHTS
    const shipmentTrend = volumeTrendResult.rows.map((item, index, arr) => {
      const prev = arr[index - 1]?.volume || 0;

      const growth =
        prev === 0 ? 100 : ((item.volume - prev) / prev) * 100;

      return {
        ...item,
        growth: Number(growth.toFixed(1)),
      };
    });

    // 3. DELIVERY STATUS DISTRIBUTION (SAFE FIXED STRUCTURE)
    const rawStatusResult = await pool.query(`
      SELECT
        LOWER(status) AS status,
        COUNT(*)::int AS count
      FROM shipments
      GROUP BY LOWER(status);
    `);

    const statuses = ["pending", "assigned", "transit", "delivered"];

    const statusMap = new Map(
      rawStatusResult.rows.map((r) => [r.status, r.count])
    );

    const deliveryStatus = statuses.map((status) => ({
      status,
      count: statusMap.get(status) || 0,
    }));

    // 4. RECENT SHIPMENTS
    const shipmentsResult = await pool.query(`
      SELECT *
      FROM shipments
      ORDER BY created_at DESC
      LIMIT 10;
    `);

    return res.json({
      summary: summaryResult.rows[0],
      shipmentTrend, // 👈 FIXED (NOW INCLUDES WAVE + GROWTH)
      deliveryStatus,
      shipments: shipmentsResult.rows,
    });

  } catch (error) {
    console.log("ANALYTICS ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAnalytics };