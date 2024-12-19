import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import DashBoard from "./pages/DashBoard";
import { SignIn } from "./pages/Sigin";
import { SignUp } from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SharedBrain } from "./pages/SharedBrain";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/brain/:id" element={<SharedBrain />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashBoard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
