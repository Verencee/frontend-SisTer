// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./auth/signIn";
import SignUp from "./auth/signUp";
import Home from "./pages/Home";
import CharacterDetail from "./pages/CharacterDetail"; // 1. Import halaman detail
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      {/* 2. Tambahkan Route untuk Detail Karakter */}
      <Route
        path="/character/:id"
        element={
          <ProtectedRoute>
            <CharacterDetail />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}