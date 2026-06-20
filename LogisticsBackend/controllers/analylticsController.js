const pool = require("../config/db");

const getAnalytics = async (req, res) => {
  try {
    // 1. SUMMARY CARDS
    const summaryResult = await pool.query(`
      SELECT
        COUNT(*) AS total_shipments,
        SUM(amount) AS revenue,
        COUNT(*) FILTER (WHERE status = 'pending') AS pending,
        COUNT(*) FILTER (WHERE status = 'transit') AS transit,
        COUNT(*) FILTER (WHERE status = 'delivered') AS delivered
      FROM shipments
    `);

    // 2. SHIPMENT TREND (MONTHLY)
    const trendResult = await pool.query(`
      SELECT
        TO_CHAR(created_at, 'Mon') AS month,
        COUNT(*) AS total
      FROM shipments
      GROUP BY month
      ORDER BY MIN(created_at)
    `);

    // 3. DELIVERY STATUS DISTRIBUTION
    const statusResult = await pool.query(`
      SELECT
        status,
        COUNT(*) AS count
      FROM shipments
      GROUP BY status
    `);

    // 4. RECENT SHIPMENTS
    const shipmentsResult = await pool.query(`
      SELECT *
      FROM shipments
      ORDER BY created_at DESC
      LIMIT 10
    `);

    return res.json({
      summary: summaryResult.rows[0],
      shipmentTrend: trendResult.rows,
      deliveryStatus: statusResult.rows,
      shipments: shipmentsResult.rows
    });

  } catch (error) {
    console.log("ANALYTICS ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAnalytics };