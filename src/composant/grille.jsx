import React, { useEffect, useState } from "react";
import rond from "/src/assets/circle.svg";
import croix from "/src/assets/cross.svg";

function Grille({
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

                }) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [firstLoss, setFirstLoss] = useState(false);

    const checkWinner = (grid) => {
        for (let row of grid) {
            if (row.every((cell) => cell === "O")) return "O";
            if (row.every((cell) => cell === "X")) return "X";
        }

        for (let col = 0; col < 3; col++) {
            if (grid[0][col] && grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col]) {
                return grid[0][col];
            }
        }
        if (grid[0][0] && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
            return grid[0][0];
        }
        if (grid[0][2] && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
            return grid[0][2];
        }

        return null;
    };

    const checkDraw = (grid) => {
        return grid.every((row) => row.every((cell) => cell !== null));
    };

    const handleClick = (rowIndex, colIndex) => {
        if (grid[rowIndex][colIndex] || winner) return;

        const newGrid = grid.map((row, rIndex) =>
            row.map((cell, cIndex) =>
                rIndex === rowIndex && cIndex === colIndex ? currentPlayer : cell
            )
        );

        const potentialWinner = checkWinner(newGrid);
        if (potentialWinner) {
            setWinner(potentialWinner);
            if (potentialWinner === "O" && !firstLoss && modeDeJeu === "ordinateur") {
                setFirstLoss(true);
                stockerLocal(scoreX);
            }
        } else if (checkDraw(newGrid)) {
            setIsDraw(true);
        } else {
            setCurrentPlayer(currentPlayer === "O" ? "X" : "O");
        }

        setGrid(newGrid);
    };

    const botPlay = () => {
        const emptyCells = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!grid[i][j]) emptyCells.push({ row: i, col: j });
            }
        }

        const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        handleClick(randomMove.row, randomMove.col);
    };

    useEffect(() => {
        if (modeDeJeu === "ordinateur" && currentPlayer === "O" && !winner) {
            setIsDisabled(true);
            setTimeout(() => {
                botPlay();
                setIsDisabled(false);
            }, 1000);
        }
    }, [currentPlayer, grid, winner, modeDeJeu]);

    useEffect(() => {
        const refreshed = sessionStorage.getItem("refreshed");
        if(refreshed === 'false'){
            sauvegarderDernierePartie();
        }
    }, [grid, currentPlayer, winner, isDraw, scoreX, scoreO, Ties]);

    return (
        <div className="space-y-4 w-full mx-auto mt-2 sm:mt-10 p-3.5 relative">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-between">
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            onClick={() => handleClick(rowIndex, colIndex)}
                            className="h-20 w-20 sm:h-28 sm:w-28  flex justify-center items-center border-b-8 border-[#0E1E27] p-4 rounded-2xl bg-[#1D313C] shadow-2xl cursor-pointer select-none"
                            style={{ pointerEvents: isDisabled ? "none" : "auto" }}
                        >
                            {cell ? <img src={cell === "O" ? rond : croix} alt="" /> : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grille;