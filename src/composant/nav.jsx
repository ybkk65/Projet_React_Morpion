import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "/src/assets/Morpion Mania-2.svg";

function Nav() {
    const navigate = useNavigate();
    const location = useLocation(); // Récupère la route actuelle
    const [menuOpen, setMenuOpen] = useState(false);
    const [navHeight, setNavHeight] = useState(0);

    const handleNavigation = (path) => {
        navigate(path);
        setMenuOpen(false); // Ferme le menu après la navigation
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Fonction pour appliquer une classe au lien actif
    const isActive = (path) => (location.pathname === path ? "bg-yellow-500" : "bg-transparent hover:text-yellow-400");

    // Détecte la hauteur de la navigation
    useEffect(() => {
        const navElement = document.querySelector("nav");
        if (navElement) {
            setNavHeight(navElement.offsetHeight); // Définit la hauteur de la barre de navigation
        }
    }, []);

    return (
        <>
            {/* Barre de navigation */}
            <nav className="bg-transparent fixed top-0 w-full z-30 backdrop-blur-md">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div
                        className="flex md:mr-24 items-center space-x-3 rtl:space-x-reverse cursor-pointer"
                        onClick={() => handleNavigation("/")}
                    >
                        <img src={logo} className="h-16 md:h-24" alt="Morpion Mania Logo" />
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-[#2EC2BE] focus:outline-none focus:ring-2 focus:ring-gray-200"
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div className={`${menuOpen ? "block" : "hidden"} w-full md:block md:w-auto z-20`}>
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-[#182831] md:bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            <li>
                                <span
                                    onClick={() => handleNavigation("/")}
                                    className={`cursor-pointer block py-2 px-3 rounded ${isActive("/")}`}
                                >
                                    Accueil
                                </span>
                            </li>
                            <li>
                                <span
                                    onClick={() => handleNavigation("/classement")}
                                    className={`cursor-pointer block py-2 px-3 rounded ${isActive("/classement")}`}
                                >
                                    Classement
                                </span>
                            </li>
                            <li>
                                <span
                                    onClick={() => handleNavigation("/jeu")}
                                    className={`cursor-pointer block py-2 px-3 rounded ${isActive("/jeu")}`}
                                >
                                    Jeu
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Ajout de marge pour le contenu */}
            <div style={{ paddingTop: navHeight }} /> {/* Espace pour le contenu afin qu'il ne soit pas masqué */}
        </>
    );
}

export default Nav;