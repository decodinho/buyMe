// Fonction pour gérer l'ID de session
function initSession() {
    // 1. Tenter de récupérer l'ID existant dans le casier (LocalStorage)
    let sessionId = localStorage.getItem('mode_ia_session_id');

    // 2. Si le casier est vide (première visite ou machine différente)
    if (!sessionId) {
        console.log("Aucun ID trouvé. Génération d'un nouveau...");
        // Génère un ID unique type : "550e8400-e29b-41d4-a716-446655440000"
        sessionId = self.crypto.randomUUID();
        
        // 3. Sauvegarder sur le disque dur
        localStorage.setItem('mode_ia_session_id', sessionId);
    } else {
        console.log("ID récupéré du disque dur :", sessionId);
    }

    // Affichage sur la page
    document.getElementById('session-display').innerText = sessionId;
}

// Fonction pour tester le changement d'ID (vidage du casier)
function resetSession() {
    localStorage.removeItem('mode_ia_session_id');
    location.reload();
}

// Lancer au chargement de la page
window.onload = initSession;
