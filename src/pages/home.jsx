import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChoisirSymbole from "../composant/ChoisirSymbole.jsx";

function Home() {
    const [pseudoJoueur1, setPseudoJoueur1] = useState("");
    const [pseudoJoueur2, setPseudoJoueur2] = useState("");
    const [modeDeJeu, setModeDeJeu] = useState(null);
    const [typeDeJeu, setTypeDeJeu] = useState("");
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState(null);
    const [symboleChoisi, setSymboleChoisi] = useState("O"); // Par défaut, rond

    const handleChoixChange = (symbole) => {
        setSymboleChoisi(symbole);
    };

    const lancerPartie = () => {
        if (modeDeJeu === "ordinateur" && !pseudoJoueur1) {
            setAlerts("pseudo requis pour jouer !");
        } else {
            const joueur1 = pseudoJoueur1 || "Joueur 1";
            const joueur2 =
                modeDeJeu === "local" ? pseudoJoueur2 || "Joueur 2" : "CPU";

            navigate("/morpion", {
                state: {
                    pseudojoueur1: symboleChoisi === "X" ? joueur1 : joueur2,
                    pseudojoueur2: symboleChoisi === "X" ? joueur2 : joueur1,
                    modedeJeu: modeDeJeu,
                    symbolechoisi: symboleChoisi,
                    typeDeJeu: typeDeJeu,
                },
            });
        }
    };

    return (
        <>
            <div className={"flex flex-col  justify-center items-center mx-auto"}>
                <div className={"w-2/8  flex flex-col"}>
                    <ChoisirSymbole onChoixChange={handleChoixChange} />
                    <div className={"flex flex-col gap-3"}>
                        <button
                            onClick={() => setTypeDeJeu("normal")}
                            className={`bg-[#F2B336] py-3 w-full border-[#CB890F] border-b-4 rounded-xl text-black font-bold ${
                                typeDeJeu === "normal" ? "opacity-50" : ""
                            }`}
                        >
                            Classique Mode
                        </button>
                        <button
                            onClick={() => setTypeDeJeu("variant")}
                            className={`bg-[#2EC4BD] py-3 w-full border-[#20797A] border-b-4 rounded-xl text-black font-bold ${
                                typeDeJeu === "variant" ? "opacity-50" : ""
                            }`}
                        >
                            Variant Mode
                        </button>
                    </div>

                    {(typeDeJeu === "variant" || typeDeJeu === "normal") && (
                        <div className={"flex flex-col gap-3 mt-6"}>
                            <button
                                onClick={() => setModeDeJeu("ordinateur")}
                                className={`bg-[#F2B336] py-3 w-full border-[#CB890F] border-b-4 rounded-xl text-black font-bold ${
                                    modeDeJeu === "ordinateur" ? "opacity-50" : ""
                                }`}
                            >
                                Classique (Vs Ordinateur)
                            </button>
                            <button
                                onClick={() => setModeDeJeu("local")}
                                className={`bg-[#2EC4BD] py-3 w-full border-[#20797A] border-b-4 rounded-xl text-black font-bold ${
                                    modeDeJeu === "local" ? "opacity-50" : ""
                                }`}
                            >
                                Local (2 Joueurs)
                            </button>
                        </div>
                    )}

                    {modeDeJeu === "ordinateur" && (
                        <div className="mt-6 flex flex-col">
                            <input
                                type="text"
                                value={pseudoJoueur1}
                                onChange={(e) => setPseudoJoueur1(e.target.value)}
                                className="px-4 py-2 border rounded-md w-full  text-black placeholder-gray-600 font-medium"
                                placeholder="Entrez votre pseudo"
                            />
                            <p className={"text-amber-400 mt-2 max-w-56 sm:text-sm font-medium"}>{alerts}</p>
                        </div>
                    )}

                    {modeDeJeu === "local" && (
                        <div className="mt-6 flex flex-col gap-3 mt-6">
                            <input
                                type="text"
                                value={pseudoJoueur1}
                                onChange={(e) => setPseudoJoueur1(e.target.value)}
                                className="px-4 py-2 border rounded-md  text-black placeholder-gray-600 font-medium"
                                placeholder="Entrez le nom du joueur 1"
                            />
                            <input
                                type="text"
                                value={pseudoJoueur2}
                                onChange={(e) => setPseudoJoueur2(e.target.value)}
                                className="px-4 py-2 border rounded-md  text-black placeholder-gray-600 font-medium"
                                placeholder="Entrez le nom du joueur 2"
                            />
                        </div>
                    )}

                    {(modeDeJeu === "ordinateur" || modeDeJeu === "local") && (
                        <div className="flex flex-col justify-center mt-5 mb-20">
                            <button
                                onClick={lancerPartie}
                                className="px-6 py-2 bg-[#B6CAD3] text-white rounded font-medium text-black"
                            >
                                Lancer la Partie
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;