import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home.jsx";
import Nav from "./composant/nav.jsx";
import Morpion from "./pages/morpion.jsx";
import Classement from "./pages/classement.jsx";
import Footer from "./composant/footer.jsx";

const SupRefreshed = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/morpion") {
            if (!sessionStorage.getItem("refreshed")) {
                sessionStorage.setItem("refreshed", "false");
            } else if (sessionStorage.getItem("refreshed") === "false") {
                sessionStorage.setItem("refreshed", "true");
            }
        } else {
            sessionStorage.removeItem("refreshed");
        }
    }, [location]);

    return null;
};

function App() {
    return (
        <div className="min-h-screen bg-[#203741] text-white font-poppins">
            <Router>
                <Nav />
                <SupRefreshed />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/morpion" element={<Morpion />} />
                    <Route path="/classement" element={<Classement />} />
                    <Route path="/jeu" element={<Morpion />} />
                </Routes>
            </Router>
            <Footer/>
        </div>
    );
}

export default App;