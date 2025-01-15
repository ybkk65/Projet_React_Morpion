import React, { useState, useEffect } from "react";
import Grille from "../composant/grille.jsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Resultat from "../composant/banniereResultat.jsx";
import HeaderMorpion from "../composant/headerMorpion.jsx";
import FooterMorpion from "../composant/footerMorpion.jsx";
import ContinuerJouer from "../composant/continuerJouer.jsx"; // Assurez-vous d'importer le bon composant

function Morpion() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pseudoJoueur1, pseudoJoueur2, modeDeJeu } = location.state || {};

    const [grid, setGrid] = useState(Array(3).fill(Array(3).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState("O");
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [scoreX, setScoreX] = useState(0);
    const [scoreO, setScoreO] = useState(0);
    const [Ties, setTies] = useState(0);
    const [refreshed, setRefreshed] = useState(false);

    const id = Date.now();

    const resetGrid = () => {
        setGrid(Array(3).fill(Array(3).fill(null)));
        setCurrentPlayer("O");
        setWinner(null);
        setIsDraw(false);
    };

    const sauvegarderPartie = (partie) => {
        const historique = JSON.parse(localStorage.getItem("historiqueParties")) || [];
        historique.push(partie);
        localStorage.setItem("historiqueParties", JSON.stringify(historique));
    };

    const sauvegarderDernierePartie = () => {
        const dernierePartie = {
            players: {
                player1: pseudoJoueur1,
                player2: pseudoJoueur2,
                currentPlayer: currentPlayer,
            },
            score: { score1: scoreX, score2: scoreO, ties: Ties },
            resultats: { winner: winner, isDraw: isDraw },
            grille: grid,
        };

        localStorage.setItem("dernierePartie", JSON.stringify(dernierePartie));
    };

    const stockerLocal = (Playerscore) => {
        const partie = {
            id: id,
            players: pseudoJoueur1,
            score: Playerscore,
        };

        sauvegarderPartie(partie);
    };

    const quitter = () => {
        setGrid(Array(3).fill(Array(3).fill(null)));
        setCurrentPlayer("O");
        setWinner(null);
        setIsDraw(false);
        setScoreX(0);
        setScoreO(0);
        setTies(0);
        localStorage.removeItem("dernierePartie");
        navigate("/");
    };

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


    const reprendreGame = () => {
        const partie = JSON.parse(localStorage.getItem("dernierePartie"));

        if (partie) {
            setScoreO(partie.score.score2);
            setScoreX(partie.score.score1);
            setTies(partie.score.ties);

            setCurrentPlayer(partie.players.currentPlayer);
            setWinner(partie.resultats.winner);
            setIsDraw(partie.resultats.isDraw);
            setGrid(partie.grille);
            setRefreshed(false);
            sessionStorage.setItem('refreshed', 'false'); 
        }
    }

    useEffect(() => {
        if (location.pathname === '/morpion') {
            const refreshedValue = sessionStorage.getItem('refreshed');

            if (refreshedValue === null || refreshedValue === 'false') {
                sessionStorage.setItem('refreshed', 'false');
                setRefreshed(false);
            } else if (refreshedValue === 'true') {
                setRefreshed(true);
            }
        }
    }, [location.pathname]);

    return (
        <div className={"bg-[#182831] w-[470px] drop-shadow-xl p-5 rounded-xl mx-auto relative"}>
            {(winner || isDraw) && (
                <Resultat winner={winner} quitter={quitter} continueToPlay={continueToPlay} />
            )}

            {refreshed === true && (
                <ContinuerJouer quitter={quitter} continueToPlay={reprendreGame} />
            )}                                                                 

            <HeaderMorpion
                currentPlayer={currentPlayer}
                resetGrid={resetGrid}
                sauvegarderDernierePartie={sauvegarderDernierePartie}
            />
            <div>
                <Grille
                    grid={grid}
                    setGrid={setGrid}
                    currentPlayer={currentPlayer}
                    setCurrentPlayer={setCurrentPlayer}
                    winner={winner}
                    setWinner={setWinner}
                    setIsDraw={setIsDraw}
                    modeDeJeu={modeDeJeu}
                    sauvegarderDernierePartie={sauvegarderDernierePartie}
                    scoreX={scoreX}
                    Ties={Ties}
                    scoreO={scoreO}
                    isDraw={isDraw}
                    stockerLocal={stockerLocal}
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