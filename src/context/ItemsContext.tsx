import axios from "axios";
import {
    createContext,
    useEffect,
    useState,
    type ReactNode
} from "react";


// =========================
// 1. TYPE D'UNE BIÈRE
// =========================

export type Biere = {
    id: number;
    nom: string;
    producteur: string;
    style: string;
    "sous-style": string;
    volume: string;
    alcool: string;
    photo: string;
    prix: number;
    count: number;
};


// =========================
// 2. TYPE DU CONTEXT
// =========================

export type PanierTypeContext = {
    items: Biere[];
    itemsPanier: Biere[];

    ajouter: (id: number) => void;
    reduire: (id: number) => void;
    trouver: (valeur: string) => void;

    showPanier: boolean;
    setShowPanier: (value: boolean) => void;

};


// =========================
// 3. CONTEXT
// =========================

export const PanierContext = createContext<PanierTypeContext | null>(null);


// =========================
// 4. PROVIDER
// =========================

export default function PanierProvider({
    children
}: {
    children: ReactNode;
}) {

    // Liste maître : toutes les bières, source de vérité (avec les counts)
    const [allBieres, setAllBieres] = useState<Biere[]>([]);

    // Terme de recherche courant
    const [recherche, setRecherche] = useState("");

    // Affichage du panier
    const [showPanier, setShowPanier] = useState(false);



    // =========================
    // 5. RÉCUPÉRER LES BIÈRES
    // =========================

    async function fetchBiere() {

        try {

            const response = await axios.get(
                "/api/bieres"
            );

            // L'API retourne :
            // { bieres: [...] }

            const bieres: Biere[] = response.data.bieres;

            // On ajoute count = 0
            const dataset = bieres.map((biere) => ({
                ...biere,
                count: 0
            }));

            setAllBieres(dataset);

        } catch (error) {

            console.error(
                "Erreur lors de la récupération des bières :",
                error
            );
        }
    }


    // Charger les bières au démarrage
    useEffect(() => {
        fetchBiere();
    }, []);


    // =========================
    // 6. AJOUTER UNE BIÈRE
    // =========================

    function ajouter(id: number) {

        setAllBieres((prevItems) =>
            prevItems.map((biere) => {

                if (biere.id === id) {

                    return {
                        ...biere,
                        count: biere.count + 1
                    };

                }

                return biere;
            })
        );
    }


    // =========================
    // 7. RETIRER UNE BIÈRE
    // =========================

    function reduire(id: number) {

        setAllBieres((prevItems) =>
            prevItems.map((biere) => {

                if (biere.id === id && biere.count > 0) {

                    return {
                        ...biere,
                        count: biere.count - 1
                    };

                }

                return biere;
            })
        );
    }


    // =========================
    // 7.5. RECHERCHER UNE BIÈRE
    // =========================

    function trouver(value: string) {
        setRecherche(value);
    }

    // Liste affichée : dérivée de allBieres + recherche à chaque render.
    // Ne jamais faire setItems(filtreData) directement, sinon la liste
    // maître (et les counts) sont écrasés par le résultat filtré.
    const items = recherche.trim() === ""
        ? allBieres
        : allBieres.filter(
            (b) =>
                b.nom.toLowerCase().includes(recherche.toLowerCase()) ||
                b.style.toLowerCase().includes(recherche.toLowerCase())
        );


    // =========================
    // 8. CRÉER LE PANIER
    // =========================

    // Important : on filtre allBieres (la liste maître), pas items,
    // pour que le panier ne perde pas ses articles quand une recherche est active.
    const itemsPanier = allBieres.filter(
        (biere) => biere.count > 0
    );


    // =========================
    // 9. VALEURS DU CONTEXT
    // =========================

    const values: PanierTypeContext = {

        items,

        itemsPanier,

        ajouter,

        reduire,
        trouver,

        showPanier,

        setShowPanier

    };


    // =========================
    // 10. RETOURNER LE PROVIDER
    // =========================

    return (
        <PanierContext.Provider value={values}>
            {children}
        </PanierContext.Provider>
    );
}