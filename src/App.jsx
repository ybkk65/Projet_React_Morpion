import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./composant/nav.jsx";
import Morpion from "./pages/morpion.jsx";
import Classement from "./pages/classement.jsx";

function App() {
    return (
        <div className="min-h-screen bg-[#203741] text-white font-poppins">
            <Router>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/morpion" element={<Morpion />} />
                    <Route path="/classement" element={<Classement />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;