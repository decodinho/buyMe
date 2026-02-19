
// Configuration
Amplify.configure({
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_BHObJQDhO',
        userPoolWebClientId: '15jr9pmj33ck0r7ms92mft2h3i'
    }
});

// 2. ÉCOUTEUR D'ÉVÉNEMENT : Quand on clique sur le bouton
document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    const email = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const errorDisplay = document.getElementById('error-message');

    try {
        // 3. L'INSTRUCTION CLÉ : Authentification auprès de Cognito
        const user = await Auth.signIn(email, password);
        
        console.log("Connexion réussie :", user);

        // Récupération du jeton pour prouver l'identité à API Gateway plus tard
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();
        
        // Stockage du nom pour l'accueil (Optionnel)
        localStorage.setItem('user_name', email);

        // 4. REDIRECTION : Vers ta page d'accueil avec les produits
        window.location.href = 'index.html';

    } catch (error) {
        console.error("Erreur Cognito :", error);
        errorDisplay.innerText = error.message; // Affiche l'erreur (ex: "User not found")
        errorDisplay.style.display = 'block';
    }
});

