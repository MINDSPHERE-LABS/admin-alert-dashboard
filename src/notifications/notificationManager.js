import toast from "react-hot-toast";

const STORAGE_KEY = "dashboard_notification_state";

function getState() {
  return (
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      users: 0,
      revenue: 0,
      images: 0,
      payments: 0,
    }
  );
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* 🔔 UNIVERSAL NOTIFY FUNCTION */
function notify(title, body) {
  // ✅ CASE 1: TAB IS ACTIVE → SHOW TOAST
  if (document.visibilityState === "visible") {
    toast.success(`${title} — ${body}`, {
      duration: 6000,
    });
    return;
  }

  // ✅ CASE 2: TAB IS NOT ACTIVE → SHOW SYSTEM NOTIFICATION
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/logo192.png",
      badge: "/logo192.png",
    });
  }
}

export function checkAndNotify(stats, revenue) {
  if (!stats || !revenue) return;

  const state = getState();

  /* ================= 👤 USERS (every 15) ================= */
  const userStep = 15;
  const prevUsers = Math.floor(state.users / userStep);
  const currUsers = Math.floor(stats.totalUsers / userStep);

  if (currUsers > prevUsers) {
    notify(
      "🎉 User Growth",
      `Users crossed ${currUsers * userStep}`
    );
    state.users = stats.totalUsers;
  }

  /* ================= 💰 REVENUE (every 2000) ================= */
  const revenueStep = 2000;
  const prevRevenue = Math.floor(state.revenue / revenueStep);
  const currRevenue = Math.floor(revenue.total / revenueStep);

  if (currRevenue > prevRevenue) {
    notify(
      "💰 Revenue Milestone",
      `Revenue crossed ₹${currRevenue * revenueStep}`
    );
    state.revenue = revenue.total;
  }

  /* ================= 🖼️ IMAGES (every 100) ================= */
  const imageStep = 100;
  const prevImages = Math.floor(state.images / imageStep);
  const currImages = Math.floor(stats.totalImagesSent / imageStep);

  if (currImages > prevImages) {
    notify(
      "🖼️ Image Usage",
      `Images crossed ${currImages * imageStep}`
    );
    state.images = stats.totalImagesSent;
  }

  /* ================= 💳 PAYMENTS (every 30) ================= */
  const paymentStep = 30;
  const prevPayments = Math.floor(state.payments / paymentStep);
  const currPayments = Math.floor(stats.totalPayments / paymentStep);

  if (currPayments > prevPayments) {
    notify(
      "💳 Payments Milestone",
      `Payments crossed ${currPayments * paymentStep}`
    );
    state.payments = stats.totalPayments;
  }

  saveState(state);
}
