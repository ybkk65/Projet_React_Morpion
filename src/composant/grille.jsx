import React from "react";
import rond from "/src/assets/circle.svg";
import croix from "/src/assets/cross.svg";

function Grille({
                    grid,
                    setGrid,
                    currentPlayer,
                    setCurrentPlayer,
                    winner,
                    setWinner,
                    isDraw,
                    setIsDraw,
                }) {
    // Vérifie si un joueur a gagné
    const checkWinner = (grid) => {
        // Vérifier les lignes
        for (let row of grid) {
            if (row.every((cell) => cell === "O")) return "O";
            if (row.every((cell) => cell === "X")) return "X";
        }

        // Vérifier les colonnes
        for (let col = 0; col < 3; col++) {
            if (grid[0][col] && grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col]) {
                return grid[0][col];
            }
        }

        // Vérifier les diagonales
        if (grid[0][0] && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
            return grid[0][0];
        }
        if (grid[0][2] && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
            return grid[0][2];
        }

        return null;
    };

    // Vérifie si la grille est pleine
    const checkDraw = (grid) => {
        return grid.every((row) => row.every((cell) => cell !== null));
    };

    // Gère le clic sur une case
    const handleClick = (rowIndex, colIndex) => {
        if (grid[rowIndex][colIndex] || winner) return; // Si la case est déjà remplie ou qu'il y a un gagnant

        const newGrid = grid.map((row, rIndex) =>
            row.map((cell, cIndex) =>
                rIndex === rowIndex && cIndex === colIndex ? currentPlayer : cell
            )
        );

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

    return (
        <div className="space-y-4 w-full mx-auto mt-10 p-3.5 relative">

            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-between">
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            onClick={() => handleClick(rowIndex, colIndex)}
                            className="h-28 w-28 flex justify-center items-center p-4 rounded-2xl bg-[#1D313C] shadow-2xl cursor-pointer select-none"
                            style={{ borderBottom: "8px solid #0E1E27" }}
                        >
                            {/* Affichage conditionnel : "O" ou "X" */}
                            {cell ? <img src={cell === "O" ? rond : croix} alt="" /> : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grille;