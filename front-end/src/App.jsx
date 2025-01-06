import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LogInPage";
import PageLayout from "./pages/PageLayout";
import SignUpPage from "./pages/SignUpPage";
import Explore from "./pages/Explore";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/explore" element={<Explore />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
