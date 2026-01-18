import { HashRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Charts from "./pages/Charts";
import MonthlyStats from "./pages/MonthlyStats";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/monthly" element={<MonthlyStats />} />
      </Routes>
    </HashRouter>
  );
}
