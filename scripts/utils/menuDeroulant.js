const menuDeroulant = document.getElementById("menuDeroulant");
//gestionnaire d'événements pour détecter les changements de sélection
menuDeroulant.addEventListener("change", () => {
  // valeur sélectionnée
  const triPar = menuDeroulant.value;

  // Triez les éléments
  trierElements(triPar);
});
