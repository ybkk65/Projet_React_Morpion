import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [pseudoJoueur1, setPseudoJoueur1] = useState("");
    const [pseudoJoueur2, setPseudoJoueur2] = useState("");
    const [modeDeJeu, setModeDeJeu] = useState(null);
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState(null);


    const lancerPartie = () => {
        if (modeDeJeu === "ordinateur" && !pseudoJoueur1) {
            setAlerts("Un pseudonyme est requis pour jouer contre l'ordinateur !");
        } else {
            const joueur1 = pseudoJoueur1 || "Joueur 1";
            const joueur2 = modeDeJeu === "local" ? (pseudoJoueur2 || "Joueur 2") : "CPU";
            navigate("/morpion", {
                state: { pseudoJoueur1: joueur1, pseudoJoueur2: joueur2 ,modeDeJeu: modeDeJeu },
            });
        }
    };

    return (
        <>
            <div className={"flex flex-col justify-center items-center mx-auto"}>
                <h2 className={"text-[#36CDCA] text-5xl mb-10"}>Bienvenue</h2>
                <h3 className={"mb-6 text-xl"}>Choisissez un mode de jeu :</h3>
                <div className={"flex gap-5 text-xl"}>
                    <button
                        onClick={() => setModeDeJeu("ordinateur")}
                        className={"px-2 py-1 bg-[#F6BC47] rounded-md font-medium  text-black"}
                    >
                        Classique (Vs Ordinateur)
                    </button>
                    <button
                        onClick={() => setModeDeJeu("local")}
                        className={"px-2 py-1 bg-[#F6BC47] rounded-md font-medium  text-black"}
                    >
                        Local (2 Joueurs)
                    </button>
                </div>

                {modeDeJeu === "ordinateur" && (
                    <div className="mt-6">
                        <label className="block text-xl mb-2">Pseudonyme Joueur :</label>
                        <input
                            type="text"
                            value={pseudoJoueur1}
                            onChange={(e) => setPseudoJoueur1(e.target.value)}
                            className="px-4 py-2 border rounded-md  text-black"
                            placeholder="Entrez votre pseudo"
                        />
                        <p className={"text-amber-400 font-medium"}>{alerts}</p>
                    </div>
                )}

                {modeDeJeu === "local" && (
                    <div className="mt-6">
                        <label className="block text-xl mb-2">Pseudonyme Joueur 1 :</label>
                        <input
                            type="text"
                            value={pseudoJoueur1}
                            onChange={(e) => setPseudoJoueur1(e.target.value)}
                            className="px-4 py-2 border rounded-md  text-black"
                            placeholder="Entrez le pseudo du joueur 1"
                        />
                        <label className="block text-xl mt-4 mb-2">Pseudonyme Joueur 2 :</label>
                        <input
                            type="text"
                            value={pseudoJoueur2}
                            onChange={(e) => setPseudoJoueur2(e.target.value)}
                            className="px-4 py-2 border rounded-md  text-black"
                            placeholder="Entrez le pseudo du joueur 2"
                        />
                    </div>
                )}

                <button
                    onClick={lancerPartie}
                    className="px-6 py-2 bg-[#B6CAD3] text-white rounded mt-10 font-medium  text-black"
                >
                    Lancer la Partie
                </button>
            </div>
        </>
    );
}

export default Home;