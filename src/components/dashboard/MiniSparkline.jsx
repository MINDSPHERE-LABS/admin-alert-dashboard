import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";

/**
 * MiniSparkline
 * @param {Array} data - [{ value: number }]
 * @param {string} color - hex color (default purple)
 * @param {number} height - chart height
 */
export default function MiniSparkline({
  data = [],
  color = "#8b5cf6",
  height = 40,
}) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <div className="sparkline-container">
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
        >
          <defs>
            <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#fff",
            }}
            labelStyle={{ display: "none" }}
            formatter={(value) => [`${Math.round(value)}`, "Value"]}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill="url(#sparklineGradient)"
            isAnimationActive={true}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
