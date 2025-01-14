import React from 'react';

function FooterMorpion({pseudoJoueur1,pseudoJoueur2,scoreX,Ties,scoreO}) {
    return (
        <div className={"flex justify-between items-center p-3.5 text-black"}>
            <div className="flex flex-col justify-center items-center w-28 px-2 py-2 bg-[#2EC2BE] rounded-2xl">
                <p>X {pseudoJoueur1}</p>
                <span className={"text-xl font-bold"}>{scoreX}</span>
            </div>
            <div className="flex flex-col justify-center items-center w-28 px-2 py-2 bg-[#A5BDC8] rounded-2xl">
                <p>Ties</p>
                <span className={"text-xl font-bold"}>{Ties}</span>
            </div>
            <div className="flex flex-col justify-center items-center w-28 px-2 py-2 bg-[#EFAF36] rounded-2xl">
                <p>O {pseudoJoueur2}</p>
                <span className={"text-xl font-bold"}>{scoreO}</span>
            </div>
        </div>
    )
}

export default FooterMorpion;