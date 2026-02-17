// FONCTION 1 : Recherche les données (API)
async function fetchPanierData() {
    const sessionId = sessionStorage.getItem('user_session_id');
    if (!sessionId) return [];
    console.log(sessionId);
    // CORRECTION : Utilisation des backticks ` pour que ${sessionId} fonctionne
    const API_URL = `https://ag73mdaex0.execute-api.us-east-1.amazonaws.com/dev/readCartBdd?sessionId=${sessionId}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // Gérer le cas où DynamoDB renvoie un objet complexe ou une chaîne
        return Array.isArray(data) ? data : JSON.parse(data);
    } catch (error) {
        console.error("Erreur de recherche :", error);
        return [];
    }
}

// FONCTION 2 : Affiche les données dans le HTML
async function afficherPanier() {
    const conteneur = document.getElementById('panier-items');
    const totalAffichage = document.getElementById('total-panier');

    // On lance la recherche
    const articles = await fetchPanierData();

    if (articles.length === 0) {
        conteneur.innerHTML = "<p style='text-align:center; padding:20px;'>Votre panier est vide.</p>";
        totalAffichage.innerText = "0,00 €";
        return;
    }

    // On génère le HTML proprement
    conteneur.innerHTML = articles.map(item => `
        <div class="item">
            <img src="${item.image || 'placeholder.png'}" alt="Produit">
            <div class="item-info">
                <div class="item-name">${item.nom || 'Article'}</div>
                <div class="item-price">${parseFloat(item.prix).toFixed(2)} €</div>
            </div>
            <button onclick="supprimerArticle('${item.SK}')" style="border:none; background:none; cursor:pointer;">🗑️</button>
        </div>
    `).join('');

    // Calcul et mise à jour du total
    const total = articles.reduce((sum, item) => sum + parseFloat(item.prix), 0);
    totalAffichage.innerText = `${total.toFixed(2)} €`;
    document.getElementById('sous-total').innerText = `${total.toFixed(2)} €`;
}

// Lancement au chargement
window.onload = afficherPanier;
