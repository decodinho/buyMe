// Configuration
AwsAmplify.Amplify.configure({
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_BHObJQDhO',
        userPoolWebClientId: '15jr9pmj33ck0r7ms92mft2h3i'
    }
});

const Auth = AwsAmplify.Auth;

document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const errorDisplay = document.getElementById('error-message');

    try {
        const user = await Auth.signIn(email, password);
        console.log("Connexion réussie :", user);

        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();

        localStorage.setItem('user_name', email);
        window.location.href = 'index.html';

    } catch (error) {
        console.error("Erreur Cognito :", error);
        if (errorDisplay) {
            errorDisplay.innerText = error.message;
            errorDisplay.style.display = 'block';
        }
    }
});
