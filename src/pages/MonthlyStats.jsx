import "../styles/dashboard.css";

export default function MonthlyStats() {
  const months = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 1600 },
    { month: "Mar", revenue: 2100 },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Monthly Revenue</h1>

      <div className="monthly-grid">
        {months.map((m) => (
          <div key={m.month} className="metric-card big">
            <div className="metric-title">{m.month}</div>
            <div className="metric-value">₹{m.revenue}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
