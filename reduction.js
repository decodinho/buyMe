window.reduction = function(prix,redux) {
  
  try {
    // CORRECTION : Ajout de https:// obligatoire
    let prixFinal = prix*(1-(redux)/100)
    return prixFinal.toFixed(2)
  } catch (err) {
    console.error("pas de prix :", err);
  }
};
