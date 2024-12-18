import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import LoginPage from "./pages/LogInPage";
import PageLayout from "./pages/PageLayout";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import Toaster from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
