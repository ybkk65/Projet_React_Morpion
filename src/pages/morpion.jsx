import React, { useState, useEffect } from "react";
import Grille from "../composant/grille.jsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Resultat from "../composant/banniereResultat.jsx";
import HeaderMorpion from "../composant/headerMorpion.jsx";
import FooterMorpion from "../composant/footerMorpion.jsx";
import ContinuerJouer from "../composant/continuerJouer.jsx";
import GrilleVariant from "../composant/grilleVariant.jsx";

function Morpion() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pseudojoueur1, pseudojoueur2, modedeJeu  ,symbolechoisi, typeDeJeu} = location.state || {};

    const [grid, setGrid] = useState(Array(3).fill(Array(3).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState('O');
    const [typeJeu, setTypeJeu] = useState(typeDeJeu || 'normal');
    const [modeDeJeu, setModeDeJeu] = useState(modedeJeu);
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [scoreX, setScoreX] = useState(0);
    const [scoreO, setScoreO] = useState(0);
    const [Ties, setTies] = useState(0);
    const [refreshed, setRefreshed] = useState(false);
    const [pseudoJoueur1, setPseudoJoueur1] = useState(pseudojoueur1);
    const [pseudoJoueur2, setPseudoJoueur2] = useState(pseudojoueur2);
    const [symboleChoisi,setSymboleChoisi] = useState(symbolechoisi);
    const [initialHistoryX,setInitialHistoryX] = useState([JSON.parse(localStorage.getItem("dernierePartie"))?.historyX || []]);
    const [initialHistoryO, setInitialHistoryO] = useState([JSON.parse(localStorage.getItem("dernierePartie"))?.historyO || []]);


    const id = Date.now();

    const resetGrid = () => {
        setGrid(Array.from({ length: 3 }, () => Array(3).fill(null)));
        setCurrentPlayer("O");
        setWinner(null);
        setIsDraw(false);
    };
    const sauvegarderPartie = (partie) => {
        const historique = JSON.parse(localStorage.getItem("historiqueParties")) || [];
        historique.push(partie);
        localStorage.setItem("historiqueParties", JSON.stringify(historique));
    };

    const sauvegarderDernierePartie = (historyX, historyO) => {
        const dernierePartie = {
            players: {
                player1: pseudoJoueur1,
                player2: pseudoJoueur2,
                currentPlayer: currentPlayer,
            },
            mode: { mode: modeDeJeu, type: typeJeu },
            score: { score1: scoreX, score2: scoreO, ties: Ties },
            resultats: { winner: winner, isDraw: isDraw },
            grille: grid,
            symboleChoisi: symboleChoisi,
            historyX: historyX,
            historyO: historyO,
        };

        console.log("Sauvegarde de la dernière partie avec :", historyX, historyO); // Debug

        localStorage.setItem("dernierePartie", JSON.stringify(dernierePartie));
    };

    const stockerLocal = (Playerscore) => {
        console.log("Stockage des données dans le localStorage : ", Playerscore , pseudojoueur1, pseudojoueur2);
        const partie = {
            id: id,
            players: symboleChoisi === "O" ? pseudoJoueur1 : pseudoJoueur2,
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
        setTypeJeu(null);
        setModeDeJeu(null);
        setPseudoJoueur1(null);
        setPseudoJoueur2(null);
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
        setCurrentPlayer("O");
        const dernierePartie = JSON.parse(localStorage.getItem("dernierePartie"));
        if (dernierePartie) {
            dernierePartie.historyX = [];
            dernierePartie.historyO = [];
            dernierePartie.grille = Array.from({ length: 3 }, () => Array(3).fill(null)); // Grille vide
            localStorage.setItem("dernierePartie", JSON.stringify(dernierePartie));
        }
    };


    const reprendreGame = () => {
        const partie = JSON.parse(localStorage.getItem("dernierePartie"));

        if (partie) {

            setScoreO(partie.score.score2);
            setScoreX(partie.score.score1);
            setTies(partie.score.ties);
            setPseudoJoueur1(partie.players.player1);
            setPseudoJoueur2(partie.players.player2);
            setCurrentPlayer(partie.players.currentPlayer);
            setWinner(null);
            setIsDraw(false);
            setGrid(partie.grille);
            setModeDeJeu(partie.mode.mode);
            setTypeJeu(partie.mode.type);
            setSymboleChoisi(partie.symboleChoisi);
            sessionStorage.setItem('refreshed', 'false');
            setRefreshed(false);
            setInitialHistoryX(partie.historyX || []);
            setInitialHistoryO(partie.historyO || []);
        }
    };
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

      useEffect(() => {
    if (location.pathname === '/jeu' && localStorage.getItem("dernierePartie")) {
        setRefreshed(true);
    }
}, [location.pathname]);





    return (
        <div className={`bg-[#182831] sm:w-[470px] w-[90%] drop-shadow-xl p-3 sm:p-5 rounded-xl mx-auto relative ${typeJeu === "variant" ? "border-8 border-rounded-xl border-fuchsia-700 shadow-fuchsia-500 shadow-2xl" : ""}`}>
            {(winner || isDraw) && (
                <Resultat winner={winner} quitter={quitter} continueToPlay={continueToPlay} />
            )}

           {refreshed === true  && (
               <ContinuerJouer quitter={quitter} continueToPlay={reprendreGame} />
           )}

            <HeaderMorpion
                currentPlayer={currentPlayer}
                resetGrid={resetGrid}
                sauvegarderDernierePartie={sauvegarderDernierePartie}
                quitter={quitter}
            />
            <div>
                {typeJeu === "variant"  && (
                <GrilleVariant
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
                    scoreO={scoreO}
                    isDraw={isDraw}
                    stockerLocal={stockerLocal}
                    symboleChoisi={symboleChoisi}
                    initialHistoryX={initialHistoryX}
                    initialHistory0={initialHistoryO}
                />
                )}
                {typeJeu === "normal"  && (
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
                    symboleChoisi={symboleChoisi}

                />
                )}
            </div>

            <FooterMorpion
                pseudoJoueur1={pseudoJoueur1}
                pseudoJoueur2={pseudoJoueur2}
                scoreX={scoreX}
                Ties={Ties}
                scoreO={scoreO}
                typeDeJeu={typeJeu}
            />
        </div>
    );
}

export default Morpion;