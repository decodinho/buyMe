async function afficherPanier() {
    const sessionId = sessionStorage.getItem('user_session_id');
    const API_URL = 'https://ag73mdaex0.execute-api.us-east-1.amazonaws.com/dev/readCartBdd?sessionId=${sessionId}';
    const conteneur = document.getElementById('panier-items'); // Votre div de destination

    try {
        const response = await fetch(API_URL);
        const articles = await response.json();

        if (articles.length === 0) {
            conteneur.innerHTML = "<p>Votre panier est vide.</p>";
            return;
        }

        // Génération du HTML pour chaque article
        conteneur.innerHTML = articles.map(item => `
            <div class="item" id="item-${item.articleId}">
                <img src="${item.image}" alt="${item.nom}">
                <div class="item-info">
                    <div class="item-name">${item.nom}</div>
                    <div class="item-price">${item.prix} €</div>
                    <div class="item-qty">Qté: ${item.quantite || 1}</div>
                </div>
                <button onclick="supprimerArticle('${item.articleId}')" class="delete-btn">🗑️</button>
            </div>
        `).join('');

        // Calcul du total
        const total = articles.reduce((sum, item) => sum + (parseFloat(item.prix) * (item.quantite || 1)), 0);
        document.getElementById('total-panier').innerText = `${total.toFixed(2)} €`;

    } catch (error) {
        console.error("Erreur lors de la récupération du panier:", error);
    }
}

// Appeler la fonction au chargement de la page
window.onload = afficherPanier;

