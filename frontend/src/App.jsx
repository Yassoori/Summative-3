import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

//import pages
import Home from "./pages/Home";
//import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
// import Signup from "./components/Signup";
// import context hook
import { useLoginModalContext } from "./hooks/useLoginModalContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />{" "}
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
