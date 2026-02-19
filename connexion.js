// Attendre que le DOM et les scripts soient complètement chargés
document.addEventListener('DOMContentLoaded', () => {
    
    // Vérifier que AWS Amplify est bien chargé
    if (!window.aws_amplify) {
        console.error('AWS Amplify n\'est pas chargé !');
        alert('Erreur de chargement de la bibliothèque. Veuillez actualiser la page.');
        return;
    }

    // Récupérer Amplify et Auth depuis la bibliothèque chargée
    const { Amplify, Auth } = window.aws_amplify;

    // Configuration d'Amplify avec vos identifiants Cognito
    Amplify.configure({
        Auth: {
            region: 'us-east-1',
            userPoolId: 'us-east-1_BHObJQDhO',
            userPoolWebClientId: '15jr9pmj33ck0r7ms92mft2h3i'
        }
    });

    console.log('✅ AWS Amplify configuré avec succès');

    // Récupération des éléments du DOM
    const loginForm = document.getElementById('loginForm');
    const errorDisplay = document.getElementById('error-message');
    const submitBtn = document.getElementById('submitBtn');

    // Fonction pour afficher les erreurs
    function showError(message) {
        if (errorDisplay) {
            errorDisplay.innerText = message;
            errorDisplay.style.display = 'block';
        }
    }

    // Fonction pour masquer les erreurs
    function hideError() {
        if (errorDisplay) {
            errorDisplay.style.display = 'none';
            errorDisplay.innerText = '';
        }
    }

    // Écouteur d'événement sur le formulaire
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Empêche le rechargement de la page
            
            // Masquer les erreurs précédentes
            hideError();

            // Récupération des valeurs du formulaire
            const email = document.getElementById('login').value.trim();
            const password = document.getElementById('password').value;

            // Validation basique
            if (!email || !password) {
                showError('Veuillez remplir tous les champs.');
                return;
            }

            // Désactiver le bouton pendant la requête
            submitBtn.disabled = true;
            submitBtn.innerText = 'Connexion en cours...';

            try {
                // Authentification auprès de Cognito
                const user = await Auth.signIn(email, password);
                console.log("✅ Connexion réussie :", user);

                // Récupération du jeton JWT
                const session = await Auth.currentSession();
                const token = session.getIdToken().getJwtToken();
                console.log('🔑 Token JWT récupéré');

                // Stockage des informations utilisateur
                localStorage.setItem('user_name', email);
                localStorage.setItem('jwt_token', token);

                // Message de succès
                showError(''); // Effacer les erreurs
                alert('Connexion réussie ! Redirection en cours...');

                // Redirection vers la page d'accueil
                window.location.href = 'index.html';

            } catch (error) {
                console.error("❌ Erreur Cognito :", error);
                
                // Gestion des erreurs spécifiques de Cognito
                let errorMessage = 'Erreur de connexion. Veuillez réessayer.';
                
                if (error.code === 'UserNotFoundException') {
                    errorMessage = 'Utilisateur introuvable. Vérifiez votre identifiant.';
                } else if (error.code === 'NotAuthorizedException') {
                    errorMessage = 'Identifiant ou mot de passe incorrect.';
                } else if (error.code === 'UserNotConfirmedException') {
                    errorMessage = 'Votre compte n\'est pas encore confirmé. Vérifiez vos emails.';
                } else if (error.code === 'NetworkError') {
                    errorMessage = 'Erreur réseau. Vérifiez votre connexion internet.';
                } else if (error.message) {
                    errorMessage = error.message;
                }

                showError(errorMessage);

                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.innerText = 'Se connecter';
            }
        });
    } else {
        console.error('❌ Formulaire de connexion introuvable !');
    }

    // Masquer l'erreur quand l'utilisateur tape dans les champs
    const inputs = document.querySelectorAll('.form__input');
    inputs.forEach(input => {
        input.addEventListener('input', hideError);
    });

});
