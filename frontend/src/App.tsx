import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "@/components/theme-provider"


import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";

//dashboard pages
import Dashboard_Home from "@/pages/dashboard_pages/Home"
import Dashboard_Todo from "@/pages/dashboard_pages/Todo-list"
import Dashboard_Forum from "@/pages/dashboard_pages/Forum"

export default function AppRoutes() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}