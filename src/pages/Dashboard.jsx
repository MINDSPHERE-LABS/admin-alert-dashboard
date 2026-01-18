import { useRef, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import { checkAndNotify } from "../notifications/notificationManager";
// import { registerPush } from "../push/registerPush";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import MetricsGrid from "../components/dashboard/MetricsGrid";
import StatusBar from "../components/dashboard/StatusBar";

import "../styles/dashboard.css";

export default function Dashboard() {
  // 🌗 Theme
  const [theme, setTheme] = useState("dark");

  // 📊 Data
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState({
    total: 0,
    last24h: 0,
  });

  // ⏳ UI state
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 🔁 Abort controller (cleanup only)
  const abortControllerRef = useRef(null);

  // 🔁 Fetch dashboard data
  const fetchData = useCallback(async () => {
    try {
      setIsRefreshing(true);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const [statsRes, revenueRes] = await Promise.all([
        axios.get("/api/admin/dashboard-stats", {
          signal: controller.signal,
        }),
        axios.get("/api/admin/revenue-stats", {
          signal: controller.signal,
        }),
      ]);

      if (statsRes.data.success && revenueRes.data.success) {
        const statsData = statsRes.data.stats;
        const revenueData = {
          total: Number(revenueRes.data.revenue?.total) || 0,
          last24h: Number(revenueRes.data.revenue?.last24h) || 0,
        };

        setStats(statsData);
        setRevenue(revenueData);

        // 🔔 Browser + system notifications
        checkAndNotify(statsData, revenueData);
      }

      setLastUpdated(new Date());
      setRefreshCount((c) => c + 1);
    } catch (err) {
      if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;
      console.error("Dashboard API error:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // 🔔 Ask notification permission ONCE
  useEffect(() => {
    if (!("Notification" in window)) return;

    if (Notification.permission === "default") {
      Notification.requestPermission().then((p) =>
        console.log("Notification permission:", p)
      );
    }
  }, []);

  // 🌗 Restore theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  // 📲 Register push (safe)
  // useEffect(() => {
  //   try {
  //     registerPush();
  //   } catch (e) {
  //     console.warn("Push not supported:", e.message);
  //   }
  // }, []);

  // ⏱ Auto refresh every 4 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 4000);

    return () => {
      clearInterval(interval);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return (
    <div className="dashboard-container" data-theme={theme}>
      <Toaster position="top-right" />

      <DashboardHeader theme={theme} setTheme={setTheme} />

      <MetricsGrid stats={stats} revenue={revenue} loading={loading} />

      <StatusBar
        lastUpdated={lastUpdated}
        refreshCount={refreshCount}
        onRefresh={fetchData}
        isRefreshing={isRefreshing}
      />
    </div>
  );
}
