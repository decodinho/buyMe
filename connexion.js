// Configuration
aws_amplify.Amplify.configure({
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_BHObJQDhO',
        userPoolWebClientId: '15jr9pmj33ck0r7ms92mft2h3i'
    }
});

const Auth = aws_amplify.Auth;

// ÉCOUTEUR D'ÉVÉNEMENT : Quand on clique sur le bouton
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    const email = document.getElementById('login').value;   // ⚠️ correction : prendre la valeur du champ login
    const password = document.getElementById('password').value;
    const errorDisplay = document.getElementById('error-message');

    try {
        // Authentification auprès de Cognito
        const user = await Auth.signIn(email, password);
        console.log("Connexion réussie :", user);

        // Récupération du jeton
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();

        // Stockage du nom pour l'accueil (Optionnel)
        localStorage.setItem('user_name', email);

        // Redirection
        window.location.href = 'index.html';

    } catch (error) {
        console.error("Erreur Cognito :", error);
        if (errorDisplay) {
            errorDisplay.innerText = error.message;
            errorDisplay.style.display = 'block';
        }
    }
});
