// Importez la classe Api depuis le fichier Api.js
import { Api } from "../api/Api.js";

// Créez une instance de la classe Api
const api = new Api("data/photographers.json");

document.addEventListener("DOMContentLoaded", async () => {
  const displayImages = async () => {
    const data = await api.fetch();

    // Parcourez les photographes
    data.photographers.forEach((photographer) => {
      console.log("Photographer:", photographer);

      // Vérifiez si le photographe a des médias
      if (photographer.media) {
        photographer.media.forEach((image) => {
          const imageElement = document.createElement("div");
          imageElement.classList.add("link");
          imageElement.innerHTML = `
            <div class="image"><img src="assets/images/${image.image}" alt="${image.title}"></div>
            <div class="photographerId">${image.photographerId}</div>
            <div class="title">${image.title}</div>
            <div class="likes">${image.likes}</div>
          `;

          // Ajoutez l'élément de l'image à la section
          section.appendChild(imageElement);
        });
      }
    });
  };

  // Appelez la fonction pour afficher les images
  await displayImages();
});
