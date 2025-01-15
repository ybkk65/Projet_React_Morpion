import React, { useEffect, useState } from 'react';

function Classement() {
    const [historiqueParties, setHistoriqueParties] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('historiqueParties');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const sortedData = parsedData.sort((a, b) => b.score - a.score);
            setHistoriqueParties(sortedData);
        }
    }, []);

    return (
        <div className={"w-[80%] mx-auto"}>
            <div>
                <h2 className={"text-3xl font-bold mb-8"}>Classement</h2>
            </div>
            <div>
                <table className={"border-black border-2 font-bold "}>
                    <thead >
                        <tr>
                            <th className="px-10 py-2 bg-[#EFAF36] border-black border-2 font-bold text-black">Rang</th>
                            <th className="px-10 py-2 bg-[#EFAF36] border-black border-2 font-bold text-black">Joueur</th>
                            <th className="px-10 py-2 bg-[#EFAF36] border-black border-2 font-bold text-black">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                    {historiqueParties.map((partie, index) => (
                        <tr key={partie.id}>
                            <td className="px-10 py-2 border-black border-2 text-black bg-[#B6CAD3]">{index + 1}</td>
                            <td className="px-10 py-2 border-black border-2 text-black bg-[#B6CAD3]">{partie.players}</td>
                            <td className="px-10 py-2 border-black border-2 text-black bg-[#B6CAD3]">{partie.score}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Classement;