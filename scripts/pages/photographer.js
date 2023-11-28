//Mettre le code JavaScript lié à la page photographer.html

//fonction qui retourne photographers.json
export async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  return await response.json();
}

// ID pour filtrer le photographe correspondant dans le tableau
// Fonction de recherche personnalisée avec une valeur par défaut
export function findPhotographerById(photographers, id) {
  return photographers.find((photographer) => photographer.id === id);
}
// fonction asynchrone pour afficher les détails d'un phot

async function displayPhographe() {
  // Attend que la fonction getPhotographers soit résolue pour obtenir les données des photographes
  const photographersCadre = await getPhotographers();

  // Extrait le tableau des photographes à partir des données obtenues
  const photographers = photographersCadre.photographers;

  // Récupère l'ID du photographe à partir des paramètres de l'URL
  let params = new URL(document.location).searchParams;
  let id = parseInt(params.get("id"));
  console.log(id);

  // Utilisez la fonction personnalisée pour obtenir le photographe
  const selectedPhotographer = findPhotographerById(photographers, id);

  const section = document.querySelector(".photographe_header");

  // selectionne les éléments dans le DOM
  const nameElement = section.querySelector(".name");
  const locationElement = section.querySelector(".location");
  const taglineElement = section.querySelector(".tagline");

  // Mettre à jour le contenu avec les données du photographe
  nameElement.textContent = selectedPhotographer.name;
  locationElement.textContent =
    selectedPhotographer.city + " " + selectedPhotographer.country;
  taglineElement.textContent = selectedPhotographer.tagline;

  // Mettre à jour l'attribut src de l'élément img avec l'URL de l'image du photographe
  const imgElement = section.querySelector(".img");
  imgElement.src = `assets/photographers/${selectedPhotographer.portrait}`;
  imgElement.alt = "Portrait du photographe";
  imgElement.setAttribute("aria-label", "Étiquette ARIA pour l'image");
}

// Déclaration de la fonction init
async function init() {
  // Appelle la fonction pour afficher les photographes
  await displayPhographe();
}

init();
