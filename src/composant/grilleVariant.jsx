import React, { useEffect, useState } from "react";
import rond from "/src/assets/circle.svg";
import croix from "/src/assets/cross.svg";

function GrilleVariant({
                           grid,
                           setGrid,
                           currentPlayer,
                           setCurrentPlayer,
                           winner,
                           setWinner,
                           setIsDraw,
                           modeDeJeu,
                           sauvegarderDernierePartie,
                           scoreX,
                           Ties,
                           scoreO,
                           isDraw,
                           stockerLocal,
                           symboleChoisi,

                       }) {
    const countOccurrences = (grid, symbol) => {
        return grid.reduce((count, row) => {
            return count + row.filter(cell => cell === symbol).length;
        }, 0);
    };

// Récupérer la dernière partie pour initialiser les historiques
    const dernierePartie = JSON.parse(localStorage.getItem("dernierePartie"));

    const initialHistoryX = dernierePartie
        ? Array(countOccurrences(dernierePartie.grille, "X")).fill("X")
        : [];
    const initialHistoryO = dernierePartie
        ? Array(countOccurrences(dernierePartie.grille, "O")).fill("O")
        : [];

// Initialisation des états
    const [historyX, setHistoryX] = useState(initialHistoryX);
    const [historyO, setHistoryO] = useState(initialHistoryO);

    // Vérification du gagnant
    const checkWinner = (grid) => {
        for (let row of grid) {
            if (row.every((cell) => cell === "O")) return "O";
            if (row.every((cell) => cell === "X")) return "X";
        }

        for (let col = 0; col < 3; col++) {
            if (
                grid[0][col] &&
                grid[0][col] === grid[1][col] &&
                grid[1][col] === grid[2][col]
            ) {
                return grid[0][col];
            }
        }

        if (
            grid[0][0] &&
            grid[0][0] === grid[1][1] &&
            grid[1][1] === grid[2][2]
        ) {
            return grid[0][0];
        }

        if (
            grid[0][2] &&
            grid[0][2] === grid[1][1] &&
            grid[1][1] === grid[2][0]
        ) {
            return grid[0][2];
        }

        return null;
    };

    // Vérification du match nul
    const checkDraw = (grid) => {
        return grid.every((row) => row.every((cell) => cell !== null));
    };

    // Gestion du clic d'un joueur
    const handleClick = (rowIndex, colIndex) => {
        if (grid[rowIndex][colIndex] || winner) return;

        const newGrid = grid.map((row, rIndex) =>
            row.map((cell, cIndex) =>
                rIndex === rowIndex && cIndex === colIndex ? currentPlayer : cell
            )
        );

        let newHistory;
        if (currentPlayer === "X") {
            newHistory = [...historyX, [rowIndex, colIndex]];
            if (newHistory.length > 3) {
                const [oldRow, oldCol] = newHistory.shift();
                newGrid[oldRow][oldCol] = null; // Supprimer l'ancien symbole
            }
            setHistoryX(newHistory);
        } else {
            newHistory = [...historyO, [rowIndex, colIndex]];
            if (newHistory.length > 3) {
                const [oldRow, oldCol] = newHistory.shift();
                newGrid[oldRow][oldCol] = null; // Supprimer l'ancien symbole
            }
            setHistoryO(newHistory);
        }

        const potentialWinner = checkWinner(newGrid);
        if (potentialWinner) {
            setWinner(potentialWinner);
        } else if (checkDraw(newGrid)) {
            setIsDraw(true);
        } else {
            setCurrentPlayer(currentPlayer === "O" ? "X" : "O");
        }

        setGrid(newGrid);
    };


    // Jeu du bot
    const botPlay = () => {
        const emptyCells = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!grid[i][j]) emptyCells.push({ row: i, col: j });
            }
        }

        if (emptyCells.length > 0) {
            const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            handleClick(randomMove.row, randomMove.col);
        }
    };

    // Effet pour le bot
    useEffect(() => {
        if (
            modeDeJeu === "ordinateur" &&
            currentPlayer !== symboleChoisi &&
            !winner
        ) {
            const botTimeout = setTimeout(() => {
                botPlay();
            }, 400);
            return () => clearTimeout(botTimeout);
        }
    }, [currentPlayer, grid, winner, modeDeJeu]);

    useEffect(() => {
        const refreshed = sessionStorage.getItem("refreshed");
        if(refreshed === 'false') {
            sauvegarderDernierePartie();
        }
    }, [grid, currentPlayer, winner, isDraw, scoreX, scoreO, Ties]);

    useEffect(() => {
        const dernierePartie = JSON.parse(localStorage.getItem("dernierePartie"));

        if (dernierePartie) {
            // Restauration de l'historique des coups (pour X et O)
            setHistoryX(dernierePartie.historyX || []);
            setHistoryO(dernierePartie.historyO || []);

            // Restauration de la grille
            setGrid(dernierePartie.grille || Array(3).fill(Array(3).fill(null)));

            // Restauration des autres informations de jeu
            setCurrentPlayer(dernierePartie.players.currentPlayer || 'O');
            setWinner(dernierePartie.resultats.winner || null);
            setIsDraw(dernierePartie.resultats.isDraw || false);
        }
    }, []);

    return (
        <div className="space-y-4 w-full mx-auto mt-2 mb-4 p-3.5 relative">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-between">
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            onClick={() => handleClick(rowIndex, colIndex)}
                            className="h-20 w-20 sm:h-28 sm:w-28 flex justify-center items-center border-b-8 border-[#0E1E27] p-4 rounded-2xl bg-[#1D313C] shadow-2xl cursor-pointer select-none"
                        >
                            {cell ? (
                                <img
                                    src={cell === "O" ? rond : croix}
                                    alt=""
                                    className="transition-all duration-300"
                                />
                            ) : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default GrilleVariant;
