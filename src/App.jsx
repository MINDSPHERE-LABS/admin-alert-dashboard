import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Charts from "./pages/Charts";
import MonthlyStats from "./pages/MonthlyStats";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/monthly" element={<MonthlyStats />} />
      </Routes>
    </BrowserRouter>
  );
}
