import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import LoginPage from "./pages/LogInPage";
import PageLayout from "./pages/PageLayout";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
