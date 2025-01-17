import React from "react";
import PropTypes from "prop-types";

function ContinuerJouer({ quitter, continueToPlay }) {
    return (
        <div className="resultat-overlay absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 rounded-2xl">
            <div className="w-full bg-[#182831] text-white font-bold h-[200px] ">
                <h1 className="sm:text-4xl text-xl flex justify-center items-center m-9">
                   Reprendre la partie ?
                </h1>

                <div className="flex gap-8 justify-center">
                    <button
                        className="px-3 py-2 bg-[#A5BDC8] rounded-xl border-b-4 border-[#688695]transition-all duration-150 ease-in-out transform hover:scale-105 hover:shadow-lg"
                        onClick={quitter}
                    >
                        quitter
                    </button>
                    <button
                        className="px-3 py-2 bg-[#EFAF36] rounded-xl border-b-4 border-[#BE8B32] transition-all duration-150 ease-in-out transform hover:scale-105 hover:shadow-lg"
                        onClick={continueToPlay}
                    >
                        continuer
                    </button>
                </div>
            </div>
        </div>
    );
}

ContinuerJouer.propTypes = {
    winner: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    quitter: PropTypes.func.isRequired,
    continueToPlay: PropTypes.func.isRequired,
};

export default ContinuerJouer;