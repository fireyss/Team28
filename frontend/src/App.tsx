import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import { ThemeProvider } from "@/components/theme-provider"

//dashboard pages
import Dashboard_Home from "@/pages/dashboard_pages/Home"

export default function AppRoutes() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home" element={<Dashboard_Home />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}