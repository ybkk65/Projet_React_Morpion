import React, { useState } from "react";
import Grille from "../composant/grille.jsx";
import { useLocation } from "react-router-dom";
import Resultat from "../composant/banniereResultat.jsx";
import HeaderMorpion from "../composant/headerMorpion.jsx";
import FooterMorpion from "../composant/footerMorpion.jsx";

function Morpion() {
    const location = useLocation();
    const { pseudoJoueur1, pseudoJoueur2 } = location.state || {};

    const [grid, setGrid] = useState(Array(3).fill(Array(3).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState("O");
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [scoreX, setScoreX] = useState(0);
    const [scoreO, setScoreO] = useState(0);
    const [Ties, setTies] = useState(0);


    const resetGrid = () => {
        setGrid(Array(3).fill(Array(3).fill(null)));
        setCurrentPlayer("O");
        setWinner(null);
        setIsDraw(false);
    };

    const quitter = () =>{
        setGrid(Array(3).fill(Array(3).fill(null)));
        setCurrentPlayer("O");
        setWinner(null);
        setIsDraw(false);
        setScoreX(0);
        setScoreO(0);
        setTies(0);
    }

    const continueToPlay = () => {
        if (winner === "X") {
            setScoreX(scoreX + 1);
        } else if (winner === "O") {
            setScoreO(scoreO + 1);
        } else if (isDraw) {
            setTies(Ties + 1);
        }

        resetGrid();
    };


    return (

        <div className={"bg-[#182831] w-[470px] drop-shadow-xl p-5 rounded-xl mx-auto relative"}>
            {(winner || isDraw) && (
                <Resultat
                    winner={winner}
                    quitter={quitter}
                    continueToPlay={continueToPlay}
                />
            )}

           <HeaderMorpion
               currentPlayer={currentPlayer}
               resetGrid={resetGrid}
           />
            <div>
                <Grille
                    grid={grid}
                    setGrid={setGrid}
                    currentPlayer={currentPlayer}
                    setCurrentPlayer={setCurrentPlayer}
                    winner={winner}
                    setWinner={setWinner}
                    isDraw={isDraw}
                    setIsDraw={setIsDraw}
                />
            </div>

           <FooterMorpion
               pseudoJoueur1={pseudoJoueur1}
               pseudoJoueur2={pseudoJoueur2}
               scoreX={scoreX}
               Ties={Ties}
               scoreO={scoreO}

           />
        </div>
    );
}

export default Morpion;