import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import Customers from "./pages/Customers";
import Rentals from "./pages/Rentals";
import Invoices from "./pages/Invoices";
import Orders from "./pages/Orders";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Chat from "./components/Chat";
import "./App.css";

const token = () => localStorage.getItem("token");

function ProtectedLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!token()) return <Navigate to="/login" replace />;
  return (
    <div className="app-layout">
      <Sidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => { localStorage.clear(); window.location.href = "/login"; }}
      />
      <div className="dashboard-content">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        {children}
      </div>
      <Chat />
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={token() ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/cars" element={<ProtectedLayout><Cars /></ProtectedLayout>} />
        <Route path="/customers" element={<ProtectedLayout><Customers /></ProtectedLayout>} />
        <Route path="/rentals" element={<ProtectedLayout><Rentals /></ProtectedLayout>} />
        <Route path="/invoices" element={<ProtectedLayout><Invoices /></ProtectedLayout>} />
        <Route path="/orders" element={<ProtectedLayout><Orders /></ProtectedLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
