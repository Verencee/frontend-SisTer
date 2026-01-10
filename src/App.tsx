import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./auth/signIn";
import SignUp from "./auth/signUp";
import Home from "./pages/Home";
import CharacterDetail from "./pages/CharacterDetail"; 
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} toastOptions={{duration: 5000}} />
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
      <Route
        path="/character/:id"
        element={
          <ProtectedRoute>
            <CharacterDetail />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}