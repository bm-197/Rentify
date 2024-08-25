import "../src/dist/styles.css";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";

import "./index.css";
import { Route, Routes } from "react-router-dom";


function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
    </Routes>
    </>
  );
}

export default App;
