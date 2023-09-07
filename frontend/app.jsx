import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";

//import pages
import Home from "./pages/Home";

//import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <div className="project-app">
      <BrowserRouter>
        {/* custom event handler onLoginClick handle login modal */}
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
