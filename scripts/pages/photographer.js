// import { Api } from "../api/Api.js";
// import { initForm } from "../utils/contactForm.js";

// async function displayPhographe(photographer) {
//   const button = section.querySelector(".contact_button");
//   button.addEventListener("click", (e) => {
//     displayModal();
//   });
//   const section = document.querySelector(".photographe_header");

//   // selectionne les éléments dans le DOM
//   const nameElement = section.querySelector(".name");
//   const locationElement = section.querySelector(".location");
//   const taglineElement = section.querySelector(".tagline");

//   // Mettre à jour le contenu avec les données du photographe
//   nameElement.textContent = photographer.name;
//   locationElement.textContent = photographer.city + " " + photographer.country;
//   taglineElement.textContent = photographer.tagline;

//   // Mettre à jour l'attribut src de l'élément img avec l'URL de l'image du photographe
//   const imgElement = section.querySelector(".img");
//   imgElement.src = `assets/photographers/${photographer.portrait}`;
//   imgElement.alt = "Portrait du photographe";
//   imgElement.setAttribute("aria-label", "Étiquette ARIA pour l'image");
// }

// // Déclaration de la fonction init
// async function init() {
//   // Récupère l'ID du photographe à partir des paramètres de l'URL
//   let params = new URL(document.location).searchParams;
//   let id = parseInt(params.get("id"));
//   console.log(id);
//   const api = new Api("data/photographers.json");
//   const photographer = api.getPhotographer(id);
//   initForm(photographer);
//   // Appelle la fonction pour afficher les photographes
//   await displayPhographe(photographer);
// }

// init();
//Mettre le code JavaScript lié à la page photographer.html

import { MediaTemplate } from "../models/Media.js";
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

async function displayCadre() {
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

  // photographers.forEach((photographer) => {
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
  imgElement.src = `assets/medias/${selectedPhotographer.portrait}`;
  imgElement.alt = "Portrait du photographe";
  imgElement.setAttribute("aria-label", "Étiquette ARIA pour l'image");
}

async function displayMedia(photographerId) {
  const response = await fetch("data/photographers.json"); // Assurez-vous d'avoir un fichier media.json ou adaptez le chemin
  const mediaData = await response.json();

  const mediaList = mediaData.media.filter(
    (media) => media.photographerId === photographerId
  );

  const mediaContainer = document.querySelector(".media-container");

  mediaList.forEach((media) => {
    const mediaTemplate = new MediaTemplate(media);
    const mediaDOM = mediaTemplate.getMediaDOM();
    mediaContainer.appendChild(mediaDOM);
  });
}

// Ajoutez cette fonction à votre code existant
async function init() {
  let params = new URL(document.location).searchParams;
  let id = parseInt(params.get("id"));

  const photographersData = await getPhotographers();
  const selectedPhotographer = findPhotographerById(
    photographersData.photographers,
    id
  );

  await displayCadre();
  await displayMedia(id); // Affiche les médias associés au photographe sélectionné
}

init();
