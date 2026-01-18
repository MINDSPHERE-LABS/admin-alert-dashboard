import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "../styles/dashboard.css";

const COLORS = ["#8b5cf6", "#22c55e", "#f59e0b", "#ef4444"];

export default function Charts() {
  const data = [
    { name: "Users", value: 400 },
    { name: "Images", value: 300 },
    { name: "Payments", value: 200 },
    { name: "Revenue", value: 100 },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Distribution Overview</h1>

      <div className="chart-card">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={120}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
