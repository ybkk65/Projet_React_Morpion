import React from 'react';
import croix from "../assets/cross.svg";
import rond from "../assets/circle.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";

function HeaderMorpion({currentPlayer,resetGrid,sauvegarderDernierePartie}) {
    const handleClick = () => {
        resetGrid();
        sauvegarderDernierePartie();
    };
    return (
        <div className={"flex justify-between items-center p-3.5"}>
            <div className={"flex gap-2"}>
                <img className={"w-6 h-6"} src={croix} alt=""/>
                <img className={"w-6 h-6"} src={rond} alt=""/>
            </div>
            <div
                className={"px-3 py-2 rounded-md bg-[#1D313C] shadow-2xl border-b-4 border-[#0E1E27]"}
            >
                <p className={""}><span className={"font-bold"}>{currentPlayer}</span> turn</p>
            </div>

            <button
                className={"px-2 py-1 rounded-lg bg-[#A5BDC8] border-b-4 border-[#688695] transition-all duration-150 ease-in-out transform hover:scale-105 hover:shadow-lg"}
                onClick={handleClick}
            >
                <FontAwesomeIcon className={"mt-0.5"} icon={faRotateRight} size="lg" color="#1C333D"/>
            </button>

        </div>
    )
}

export default HeaderMorpion;