// countViews.js
async function countViews(productID) {
  try {
    const response = await fetch('l1upgx0w59.execute-api.us-east-1.amazonaws.com/dev/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productID: productID }),
      keepalive: true 
    });
    console.log(`Vue enregistrée pour ${productID}`);
  } catch (err) {
    console.error("Erreur de comptage :", err);
  }
}

