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

          // 2. SHIPMENT TREND (MONTHLY)
      const trendResult = await pool.query(`
        SELECT
          TO_CHAR(DATE_TRUNC('month', created_at), 'Mon YYYY') AS month,
          COUNT(*)::int AS total
        FROM shipments
        GROUP BY DATE_TRUNC('month', created_at)
        ORDER BY DATE_TRUNC('month', created_at);
      `);

    // 3. DELIVERY STATUS DISTRIBUTION (FIXED)
    const rawStatusResult = await pool.query(`
      SELECT
        LOWER(status) AS status,
        COUNT(*)::int AS count
      FROM shipments
      GROUP BY LOWER(status);
    `);

    // 🔥 FORCE ALL STATUSES (VERY IMPORTANT FOR CHARTS)
    const statuses = ["pending", "assigned", "transit", "delivered"];

    const statusMap = new Map(
      rawStatusResult.rows.map((row) => [row.status, parseInt(row.count)])
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
      shipmentTrend: trendResult.rows,
      deliveryStatus,
      shipments: shipmentsResult.rows,
    });

  } catch (error) {
    console.log("ANALYTICS ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAnalytics };