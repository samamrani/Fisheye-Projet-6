//Mettre le code JavaScript lié à la page photographer.html

//fonction qui retourne photographers.json
async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  return await response.json();
}

// fonction asynchrone pour afficher les détails d'un photographe
async function displayCadre() {
  // Attend que la fonction getPhotographers soit résolue pour obtenir les données des photographes
  const photographersCadre = await getPhotographers();

  // Extrait le tableau des photographes à partir des données obtenues
  const photographers = photographersCadre.photographers;

  // Récupère l'ID du photographe à partir des paramètres de l'URL
  let params = new URL(document.location).searchParams;
  let id = parseInt(params.get("id"));
  console.log(id);

  // Utilisez l'ID pour filtrer le photographe correspondant dans le tableau
  const selectedPhotographer = photographers.find(
    (photographer) => photographer.id === id
  );
  // photographers.forEach((photographer) => {
  const section = document.querySelector(".photographe_cadre");

  // selectionne les éléments dans le DOM
  const nameElement = section.querySelector(".name");
  const locationElement = section.querySelector(".location");
  const taglineElement = section.querySelector(".tagline");

  // Vérifiez si le photographe est défini avant de mettre à jour le contenu
  if (selectedPhotographer) {
    // Mettre à jour le contenu avec les données du photographe
    nameElement.textContent = selectedPhotographer.name;
    locationElement.textContent =
      selectedPhotographer.city + " " + selectedPhotographer.country;
    taglineElement.textContent = selectedPhotographer.tagline;
  } else {
    // Affiche un message d'erreur si le photographe n'est pas trouvé
    console.error("Photographe introuvable");
  }
}

// Appeler la fonction pour afficher les photographes
displayCadre();

// Fonction d'initialisation asynchrone
async function init() {
  // Récupère les donnees des photographes
  const { photographers } = await getPhotographers();
  // Appelle la fonction pour afficher les photographes
  displayCadre();
}

// Appel de la fonction init de manière asynchrone
init();
