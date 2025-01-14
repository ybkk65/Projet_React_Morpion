import React from "react";
import logo from "/src/assets/Morpion Mania-2.svg";
import { useNavigate } from "react-router-dom";

function Nav() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className={"w-[80%] mx-auto flex items-center mb-[30px]"}>
            <img
                className={"h-[80px] mr-[170px] cursor-pointer"}
                src={logo}
                alt="Morpion Mania Logo"
                onClick={() => handleNavigation("/")}
            />
            <ul className={"text-xl font-bold text-[#36CDCA] flex items-center gap-10 font-poppins"}>
                <li
                    className="cursor-pointer"
                    onClick={() => handleNavigation("/")}
                >
                    Accueil
                </li>
                <li
                    className="cursor-pointer"
                    onClick={() => handleNavigation("/classement")}
                >
                    Classement
                </li>
            </ul>
        </div>
    );
}

export default Nav;