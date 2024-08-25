import "../src/dist/styles.css";
import Navbar from "./components/Navbar";
import "./index.css";


function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
