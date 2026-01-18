export async function registerPush() {
  if (!("serviceWorker" in navigator)) return;

  const registration = await navigator.serviceWorker.register("/service-worker.js");

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
  });

  // 🔥 Send subscription to backend
  await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription),
  });
}
