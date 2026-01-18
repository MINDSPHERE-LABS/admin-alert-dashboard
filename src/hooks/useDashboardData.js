import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../utils/api";
export default function useDashboardData() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalImagesSent: 0,
    totalPayments: 0,
    recentPayments: 0,
  });

  const [revenue, setRevenue] = useState({
    total: 0,
    last24h: 0,
  });

  const [comparisonData, setComparisonData] = useState({
    yesterday: { users: 0, revenue: 0 },
  });

  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const intervalRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      setIsRefreshing(true);

      const [statsRes, revenueRes] = await Promise.all([
        api.get("https://ai-backend-1-8udr.onrender.com/api/admin/dashboard-stats"),
        api.get("https://ai-backend-1-8udr.onrender.com/api/admin/revenue-stats"),
      ]);

      if (statsRes.data?.success) {
        setStats(statsRes.data.stats);
      }

      if (revenueRes.data?.success) {
        setRevenue(revenueRes.data.revenue);
      }

      setComparisonData({
        yesterday: {
          users: statsRes.data?.stats?.totalUsers || 0,
          revenue: revenueRes.data?.revenue?.last24h || 0,
        },
      });

      setLastUpdated(new Date());
      setRefreshCount((c) => c + 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(fetchData, 5000);
    return () => clearInterval(intervalRef.current);
  }, [fetchData]);

  return {
    stats,
    revenue,
    comparisonData,
    loading,
    lastUpdated,
    refreshCount,
    refresh: fetchData,
    isRefreshing,
  };
}
