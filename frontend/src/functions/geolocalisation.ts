// utils.ts
export const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

export const getClosestArticle = async (lat: string, lon: string): Promise<string> => {
    const url = `https://fr.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${lat}|${lon}&gsradius=10000&gslimit=1&format=json&origin=*`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.query.geosearch.length > 0) {
            const article = data.query.geosearch[0];
            return article.title; // Retourne le titre de l'article
        } else {
            return "Aucun article trouvé près de votre position.";
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des articles", error);
        return "Erreur lors de la récupération de l'article.";
    }
};
