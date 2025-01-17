import React, { useState } from "react";
import logo from "/src/assets/Morpion Mania-2.svg";
import { useNavigate } from "react-router-dom";

function Nav() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
        setMenuOpen(false); // Ferme le menu après la navigation
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-white border-gray-200 bg-transparent">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer" onClick={() => handleNavigation("/")}>
                    <img src={logo} className="h-16 md:h-24" alt="Morpion Mania Logo"/>
                </div>
                <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={toggleMenu}>
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5 bg text-white"
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
                <div
                    className={`${
                        menuOpen ? "block" : "hidden"
                    } w-full md:block md:w-auto`}
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <span
                                onClick={() => handleNavigation("/")}
                                className="cursor-pointer block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                            >
                                Accueil
                            </span>
                        </li>
                        <li>
                            <span
                                onClick={() => handleNavigation("/classement")}
                                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Classement
                            </span>
                        </li>
                        <li>
                            <span
                                onClick={() => handleNavigation("/jeu")}
                                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Jeu
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;