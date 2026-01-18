import MiniSparkline from "./MiniSparkline";
import Odometer from "../common/Odometer";

export default function MetricCard({
  title,
  value,
  icon,
  trendData = [],
  trendColor = "#8b5cf6",
  formatFn = (n) => n,
}) {
  return (
    <div className="metric-card">
      <div className="metric-card-header">
        <div className="metric-title">{title}</div>
        <div className="metric-icon">{icon}</div>
      </div>

      {/* 🔢 ODOMETER NUMBER (for ALL cards) */}
      <div className="metric-value odometer">
        <Odometer value={value} format={formatFn} />
      </div>

      {/* 📈 MINI TREND */}
      {trendData.length > 0 && (
        <MiniSparkline data={trendData} color={trendColor} height={34} />
      )}
    </div>
  );
}
