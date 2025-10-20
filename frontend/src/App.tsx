import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import { ThemeProvider } from "@/components/theme-provider"

//dashboard pages
import Dashboard_Home from "@/pages/dashboard_pages/Home"
import Dashboard_Todo from "@/pages/dashboard_pages/Todo-list"

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Dashboard_Home />} />
          <Route path="todo" element={<Dashboard_Todo />}/>
        </Route>
      </Routes>
    </Router>
  );
}