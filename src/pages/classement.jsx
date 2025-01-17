import React, { useEffect, useState } from "react";

function Classement() {
    const [historiqueParties, setHistoriqueParties] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem("historiqueParties");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const sortedData = parsedData.sort((a, b) => b.score - a.score);
            setHistoriqueParties(sortedData);
        }
    }, []);

    const calculateRanks = (data) => {
        let currentRank = 1;
        return data.map((partie, index) => {
            if (index > 0 && data[index - 1].score !== partie.score) {
                currentRank = index + 1;
            }
            return { ...partie, rank: currentRank };
        });
    };

    const rankedParties = calculateRanks(historiqueParties);

    return (
        <div className="w-full px-3 sm:w-[90%] md:w-[80%] mx-auto mt-14 z-10">
            <div className="overflow-x-auto sm:overflow-y-auto max-h-[70vh] font-bold border-2 border-black">
                <table className="w-full border-collapse text-sm sm:text-base">
                    <thead className="bg-[#EFAF36] border-b-4 border-black">
                    <tr>
                        <th className="px-4 sm:px-10 py-2 h-16 font-bold text-black sticky top-0 bg-[#EFAF36] z-20">
                            Rang
                        </th>
                        <th className="px-4 sm:px-10 py-2 h-16 font-bold text-black sticky top-0 bg-[#EFAF36] z-20">
                            Joueur
                        </th>
                        <th className="px-4 sm:px-10 py-2 h-16 font-bold text-black sticky top-0 bg-[#EFAF36] z-20">
                            Score
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {rankedParties.map((partie) => (
                        <tr key={partie.id}>
                            <td className="px-4 sm:px-10 py-2 border-black border-2 text-black bg-[#B6CAD3]">
                                {partie.rank}
                            </td>
                            <td className="px-4 sm:px-10 py-2 border-black border-2 text-black bg-[#B6CAD3]">
                                {partie.players}
                            </td>
                            <td className="px-4 sm:px-10 py-2 border-black border-2 text-black bg-[#B6CAD3]">
                                {partie.score}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Classement;