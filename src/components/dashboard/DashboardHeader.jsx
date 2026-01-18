import { FiSun, FiMoon, FiBell } from "react-icons/fi";

export default function DashboardHeader({ theme, setTheme }) {
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    document.body.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <header className="dashboard-header-center">
      {/* Notification */}
      <button className="header-btn">
        <FiBell />
        <span className="notify-dot" />
      </button>

      {/* Title */}
      <h1 className="dashboard-title">Pyarify Dashboard</h1>

      {/* Theme Toggle */}
      <button className="header-btn" onClick={toggleTheme}>
        {theme === "dark" ? <FiSun /> : <FiMoon />}
      </button>
    </header>
  );
}
