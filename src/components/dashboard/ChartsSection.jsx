import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const PIE_COLORS = ["#8b5cf6", "#22c55e", "#f59e0b", "#ef4444"];

export default function ChartsSection({ stats, revenue }) {
  if (!stats || !revenue) return null;

  const pieData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Images", value: stats.totalImagesSent },
    { name: "Payments", value: stats.totalPayments },
    { name: "Revenue", value: revenue.total },
  ];

  const monthlyData = [
    { month: "Jan", value: 1200 },
    { month: "Feb", value: 1800 },
    { month: "Mar", value: 2200 },
    { month: "Apr", value: 2600 },
  ];

  return (
    <div className="charts-grid">
      {/* Pie Chart */}
      <div className="chart-card">
        <h3 className="chart-title">Overall Distribution</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={90}
              label
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="chart-card">
        <h3 className="chart-title">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <Tooltip />
            <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
