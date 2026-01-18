import { FiRefreshCw } from "react-icons/fi";

export default function StatusBar({
  lastUpdated,
  refreshCount,
  onRefresh,
  isRefreshing,
}) {
  return (
    <div className="status-bar">
      <span>
        Updated:{" "}
        {lastUpdated
          ? lastUpdated.toLocaleTimeString()
          : "--:--:--"}
      </span>

      <button className="action-btn" onClick={onRefresh}>
        {/* <FiRefreshCw className={isRefreshing ? "refresh-spin" : ""} /> */}
        Refresh ({refreshCount})
      </button>
    </div>
  );
}
