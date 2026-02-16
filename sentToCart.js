/**
 * Récupère les données et les envoie à API Gateway
 */
async function sentToCart(articleId) {
    const API_URL = "https://ag73mdaex0.execute-api.us-east-1.amazonaws.com/dev/cart";

    // 1. Récupération du SessionID (depuis sessionStorage ou génération d'un nouveau)
    let sessionId = sessionStorage.getItem('user_session_id');
    if (!sessionId) {
        sessionId = crypto.randomUUID(); // Génère un ID unique
        sessionStorage.setItem('user_session_id', sessionId);
    }

    // 2. Simulation de la récupération des données de l'article (ex: depuis le DOM ou une variable)
    const articleData = {
        sessionId: sessionId,
        articleId: p.productID,
        nom: p.nom,
        prix: p.prix,
        timestamp: Date.now()
    };

    try {
        // 3. Envoi vers API Gateway avec l'API Fetch
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articleData)
        });

        if (response.ok) {
            console.log("Succès : Données envoyées à DynamoDB via AGW");
        } else {
            console.error("Erreur lors de l'envoi", await response.text());
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
    }
}

