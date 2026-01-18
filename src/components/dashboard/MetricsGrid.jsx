import MetricCard from "./MetricCard";
import {
    FiUsers,
    FiImage,
    FiCreditCard,
    FiDollarSign,
} from "react-icons/fi";
import {
    formatNumber,
    formatCurrency,
    generateSparklineData,
} from "../../utils/formatters";

export default function MetricsGrid({ stats, revenue, loading }) {
    if (loading) {
        return <div className="loading-text">Loading metrics...</div>;
    }

    if (!stats || !revenue) return null;

    return (
        <div className="metrics-grid">
            {/* REVENUE */}
            <MetricCard
                title="Total Revenue"
                value={revenue.total}
                icon={<FiDollarSign />}
                trendData={generateSparklineData(revenue.total)}
                trendColor="#ec4899"
                formatFn={formatCurrency}
            />
            {/* USERS */}
            <MetricCard
                title="Total Users"
                value={stats.totalUsers}
                icon={<FiUsers />}
                trendData={generateSparklineData(stats.totalUsers)}
                trendColor="#8b5cf6"
                formatFn={formatNumber}
            />

            {/* IMAGES */}
            <MetricCard
                title="Images Sent"
                value={stats.totalImagesSent}
                icon={<FiImage />}
                trendData={generateSparklineData(stats.totalImagesSent)}
                trendColor="#22c55e"
                formatFn={formatNumber}
            />

            {/* PAYMENTS */}
            <MetricCard
                title="Total Payments"
                value={stats.totalPayments}
                icon={<FiCreditCard />}
                trendData={generateSparklineData(stats.totalPayments)}
                trendColor="#f59e0b"
                formatFn={formatNumber}
            />


        </div>
    );
}
