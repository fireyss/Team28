import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";

import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";

// login pages
import Auth_Login from "@/pages/auth_pages/Login";
import Auth_SignUp from "@/pages/auth_pages/SignUp"

// dashboard pages
import Dashboard_Home from "@/pages/dashboard_pages/Home";
import Dashboard_Todo from "@/pages/dashboard_pages/Todo-list";
import Dashboard_Forum from "@/pages/dashboard_pages/Forum";
import Dashboard_Project from "@/pages/dashboard_pages/Projects"

// route guards
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";

export default function AppRoutes() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Auth />}>
                <Route index element={<Auth_Login />} />
                <Route path="signup" element={<Auth_SignUp />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Dashboard_Home />} />
                <Route path="todo" element={<Dashboard_Todo />} />
                <Route path="forum/*" element={<Dashboard_Forum />} />
                <Route path="projects" element={<Dashboard_Project />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
