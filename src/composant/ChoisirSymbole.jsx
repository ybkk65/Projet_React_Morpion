import React, { useState } from 'react';
import Rond from "../composant/rond.jsx";
import Croix from "../composant/croix.jsx";

const ChoisirSymbole = ({ onChoixChange }) => {
    const [choix, setChoix] = useState('O');

    const handleChoix = (symbole) => {
        setChoix(symbole);
        if (onChoixChange) {
            onChoixChange(symbole);
        }
    };

    return (
        <div className={"bg-[#182831] rounded-xl px-8 py-4 flex flex-col justify-center items-center mb-6"}>
            <h2 className={"mb-4"}>Choisissez le symbole du player 1</h2>
            <div className={"flex gap-2 bg-[#203741] p-2 rounded-lg mb-2"}>
                <button
                    className={`py-3 px-16 rounded  ${choix === 'X' ? 'bg-[#A5BDC8] text-[#182831]' : 'text-[#A5BDC8] '}`}
                    onClick={() => handleChoix('X')}
                >
                    <div className={"w-8 h-8"}><Croix /></div>
                </button>
                <button
                    className={`py-3 px-16 rounded ${choix === 'O' ? 'bg-[#A5BDC8] text-[#182831]' : 'text-[#A5BDC8]'}`}
                    onClick={() => handleChoix('O')}
                >
                    <div className={"w-8 h-8"}><Rond /></div>
                </button>
            </div>
            <p className={"flex gap-2 items-center mt-2"}>Rappel: <span className={"w-3 h-3"}> <Rond/> </span> commence la partie.</p>
        </div>
    );
};

export default ChoisirSymbole;