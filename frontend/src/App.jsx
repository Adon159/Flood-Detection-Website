import { Routes, Route, Navigate } from "react-router-dom";
import ReliefRequestForm from "./pages/ReliefRequestForm";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import VictimDashboard from "./pages/VictimDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import AdminResources from "./pages/AdminResources";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminDonations from "./pages/AdminDonations";
import ManageUsers from "./pages/manageUsers";

import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";

import MakeDonation from "./pages/MakeDonation";
import DonationHistory from "./pages/DonationHistory";

import AdminChat from "./pages/AdminChat";        // ✅ NEW
import ReportChat from "./pages/ReportChat";      // ✅ NEW

// ✅ NEW PAGE IMPORT
import AdminReliefRequests from "./pages/AdminReliefRequests";

import RoleProtectedRoute from "./components/RoleProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* ---------------- AUTH ---------------- */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ---------------- DASHBOARDS ---------------- */}
      <Route
        path="/victim"
        element={
          <RoleProtectedRoute allowedRoles={["Victim"]}>
            <VictimDashboard />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/donor"
        element={
          <RoleProtectedRoute allowedRoles={["Donor"]}>
            <DonorDashboard />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/volunteer"
        element={
          <RoleProtectedRoute allowedRoles={["Volunteer"]}>
            <VolunteerDashboard />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <RoleProtectedRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </RoleProtectedRoute>
        }
      />

      {/* ---------------- CHAT ROUTES ---------------- */}
      <Route
        path="/report-chat"
        element={
          <RoleProtectedRoute allowedRoles={["Victim", "Donor", "Volunteer"]}>
            <ReportChat />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/chat"
        element={
          <RoleProtectedRoute allowedRoles={["Admin"]}>
            <AdminChat />
          </RoleProtectedRoute>
        }
      />

      {/* ---------------- DONATIONS ---------------- */}
      <Route
        path="/make-donation"
        element={
          <RoleProtectedRoute allowedRoles={["Donor"]}>
            <MakeDonation />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/donation-history"
        element={
          <RoleProtectedRoute allowedRoles={["Donor"]}>
            <DonationHistory />
          </RoleProtectedRoute>
        }
      />

      {/* ---------------- PROFILE ---------------- */}
      <Route
        path="/profile"
        element={
          <RoleProtectedRoute allowedRoles={["Victim", "Donor", "Volunteer", "Admin"]}>
            <Profile />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/update-profile"
        element={
          <RoleProtectedRoute allowedRoles={["Victim", "Donor", "Volunteer", "Admin"]}>
            <UpdateProfile />
          </RoleProtectedRoute>
        }
      />

      {/* ---------------- ADMIN ---------------- */}
      <Route
        path="/admin/resources"
        element={
          <RoleProtectedRoute allowedRoles={["Admin"]}>
            <AdminResources />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/manage-users"
        element={
          <RoleProtectedRoute allowedRoles={["Admin"]}>
            <ManageUsers />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/donations"
        element={
          <RoleProtectedRoute allowedRoles={["Admin"]}>
            <AdminDonations />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <RoleProtectedRoute allowedRoles={["Admin"]}>
            <AdminAnalytics />
          </RoleProtectedRoute>
        }
      />

      {/* ✅ NEW ADMIN ROUTE: Relief requests management */}
      <Route
        path="/admin/relief-requests"
        element={
          <RoleProtectedRoute allowedRoles={["Admin"]}>
            <AdminReliefRequests />
          </RoleProtectedRoute>
        }
      />

      {/* ---------------- RELIEF ---------------- */}
      <Route
        path="/relief-request"
        element={
          <RoleProtectedRoute allowedRoles={["Victim"]}>
            <ReliefRequestForm />
          </RoleProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
