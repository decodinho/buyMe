// countViews.js
// On attache la fonction à window pour qu'elle soit visible par React
window.countViews = async function(productID) {
  if (!productID) return;

  try {
    // CORRECTION : Ajout de https:// obligatoire
    const response = await fetch('l1upgx0w59.execute-api.us-east-1.amazonaws.com/dev/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productID: productID }),
      keepalive: true 
    });

    if (response.ok) {
      console.log(`✅ Vue enregistrée pour le produit : ${productID}`);
    } else {
      console.error(`❌ Erreur API (${response.status})`);
    }
  } catch (err) {
    console.error("Erreur réseau de comptage :", err);
  }
};


