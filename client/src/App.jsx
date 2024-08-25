import "../src/dist/styles.css";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./index.css";
import { Route, Routes, useLocation } from "react-router-dom";


function App() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if the current path is either signup or login
  const hideNavbarPaths = ["/signup", "/login"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  return (
    <>
    {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        
    </Routes>
    </>
  );
}

export default App;
