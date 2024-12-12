import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import DashBoard from "./pages/DashBoard";
import { SignIn } from "./pages/Sigin";
import { SignUp } from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
  return <SignIn />;
}

export default App;
