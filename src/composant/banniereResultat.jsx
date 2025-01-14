import React from "react";
import rond from "/src/assets/circle.svg";
import croix from "/src/assets/cross.svg";
import PropTypes from "prop-types";

function Resultat({ winner, quitter, continueToPlay }) {
    return (
        <div className="resultat-overlay absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="w-full bg-[#182831] text-white font-bold" style={{ height: "200px" }}>
                <h1 className="text-4xl flex justify-center items-center m-9">
                    {winner ? (
                        <div className="flex items-center">
                            <img
                                src={winner === "O" ? rond : croix}
                                alt={winner === "O" ? "Rond" : "Croix"}
                                className="w-10 h-10 mr-6"
                            />
                            a gagné le round
                        </div>
                    ) : (
                        "Match nul !"
                    )}
                </h1>

                <div className="flex gap-8 justify-center">
                    <button
                        className="px-3 py-2 bg-[#A5BDC8] rounded-xl"
                        style={{ borderBottom: "4px solid #688695" }}
                        onClick={quitter}
                    >
                        quitter
                    </button>
                    <button
                        className="px-3 py-2 bg-[#EFAF36] rounded-xl"
                        style={{ borderBottom: "4px solid #BE8B32" }}
                        onClick={continueToPlay}
                    >
                        continuer
                    </button>
                </div>
            </div>
        </div>
    );
}

Resultat.propTypes = {
    winner: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    quitter: PropTypes.func.isRequired,
    continueToPlay: PropTypes.func.isRequired,
};

export default Resultat;