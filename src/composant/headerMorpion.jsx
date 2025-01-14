import React from 'react';
import croix from "../assets/cross.svg";
import rond from "../assets/circle.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";

function HeaderMorpion({currentPlayer,resetGrid}) {
    return (
        <div className={"flex justify-between items-center p-3.5"}>
            <div className={"flex gap-2"}>
                <img className={"w-6 h-6"} src={croix} alt=""/>
                <img className={"w-6 h-6"} src={rond} alt=""/>
            </div>
            <div
                className={"px-3 py-2 rounded-md bg-[#1D313C] shadow-2xl"}
                style={{borderBottom: "4px solid #0E1E27"}}
            >
                <p className={""}><span className={"font-bold"}>{currentPlayer}</span> turn</p>
            </div>
            <div>
                <button
                    className={"px-2 py-1 rounded-lg bg-[#A5BDC8]"}
                    style={{borderBottom: "4px solid #688695"}}
                    onClick={resetGrid}
                >
                    <FontAwesomeIcon className={"mt-0.5"} icon={faRotateRight} size="lg" color="#1C333D"/>
                </button>
            </div>
        </div>
    )
}

export default HeaderMorpion;