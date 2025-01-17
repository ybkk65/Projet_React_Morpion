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
        <div className="bg-[#182831]  rounded-xl px-4 py-6  sm:mx-auto sm:px-8 flex flex-col justify-center items-center mb-6">
            <h2 className="mb-4 text-lg sm:text-xl text-center text-white">
                symbole du player 1
            </h2>
            <div className="flex gap-2 bg-[#203741] p-2 rounded-lg mb-2 w-full justify-center">
                <button
                    className={`py-3 px-8 sm:px-16 rounded transition ${
                        choix === 'X' ? 'bg-[#A5BDC8] text-[#182831]' : 'text-[#A5BDC8]'
                    }`}
                    onClick={() => handleChoix('X')}
                >
                    <div className="w-6 h-6 sm:w-8 sm:h-8">
                        <Croix />
                    </div>
                </button>
                <button
                    className={`py-3 px-8 sm:px-16 rounded transition ${
                        choix === 'O' ? 'bg-[#A5BDC8] text-[#182831]' : 'text-[#A5BDC8]'
                    }`}
                    onClick={() => handleChoix('O')}
                >
                    <div className="w-6 h-6 sm:w-8 sm:h-8">
                        <Rond />
                    </div>
                </button>
            </div>
            <p className="flex gap-2 items-center mt-2 text-sm sm:text-base text-white">
                Rappel: <span className="w-4 h-4 sm:w-6 sm:h-6"><Rond /></span> commence la partie.
            </p>
        </div>
    );
};

export default ChoisirSymbole;