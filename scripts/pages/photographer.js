import { MediaApi } from "../controleurApi/MediaApi.js";
import { initForm } from "../utils/contactForm.js";
import { MediaFactory } from "../factories/MediaFactory.js";
import { PhotographerApi } from "../controleurApi/PhotographerApi.js";

class App {
  constructor() {
    // Récupère l'ID du photographe à partir des paramètres de l'URL
    const params = new URL(document.location).searchParams;
    this.id = parseInt(params.get("id"));

    // Initialise des instances de PhotographerApi-MediaApi pour gérer les appels API
    this.photographerApi = new PhotographerApi();
    this.mediaApi = new MediaApi();

    this.photographer = null;
    this.current = -1;
    this.optionSelectionnee = null;
  }

  async init() {
    // Récupère les détails du photographe en utilisant l'API des photographes
    this.photographer = await this.photographerApi.getPhotographer(this.id);

    // Récupère les médias associés au photographe en utilisant l'API des médias
    this.medias = await this.mediaApi.getMedias(this.id);
    if (!this.medias) {
      console.error("Erreur lors de la récupération des médias.");
      return;
    }
    // Initialisation du formulaire de contact
    initForm(this.photographer);
    this.displayPhotographerHeader();
    this.displayMediasMain();
    this.displayMediaLikes();
    this.updateLightbox();
    // écouteur d'événements au menu déroulant pour le tri
    const selectMenu = document.getElementById("menuDeroulant");
    selectMenu.addEventListener("change", () => {
      // valeur de l'option sélectionnée
      this.optionSelectionnee = selectMenu.value;
      this.displayMediasMain();
    });

    const lightboxNextBtn = document.querySelector(".lightbox_next");
    const lightboxPrevBtn = document.querySelector(".lightbox_prev");
    const lightboxCloseBtn = document.querySelector("#lightboxCloseBtn");
    // Ajoute les écouteurs d'événements pour les boutons de la lightbox
    lightboxCloseBtn.addEventListener("click", () => {
      lightbox.close();
    });
    lightboxNextBtn.addEventListener("click", () => {
      this.lightboxNext();
    });
    lightboxPrevBtn.addEventListener("click", () => {
      this.lightboxPrevious();
    });

    // Écouteurs d'événements pour les touches du clavier
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  displayPhotographerHeader() {
    const section = document.querySelector(".photographe_header");

    const nameElement = section.querySelector(".name");
    const locationElement = section.querySelector(".location");
    const taglineElement = section.querySelector(".tagline");

    nameElement.textContent = this.photographer.name;
    locationElement.textContent =
      this.photographer.city + " " + this.photographer.country;
    taglineElement.textContent = this.photographer.tagline;

    const imgElement = section.querySelector(".img");

    imgElement.src = `assets/photographers/${this.photographer.portrait}`;
    imgElement.alt = "Portrait du photographe " + this.photographer.name;
    imgElement.setAttribute(
      "aria-label",
      "Portrait du photographe " + this.photographer.name
    );
  }

  displayMediasMain() {
    const mediaContainer = document.querySelector(".media-container");
    // Vide le conteneur des médias avant d'ajouter les médias triés
    mediaContainer.innerHTML = "";
    // Trie les médias en fonction de l'option sélectionnée
    if (this.medias && this.medias.length > 0) {
      if (this.optionSelectionnee === "option1") {
        this.medias.sort((a, b) => b.likes - a.likes);
      } else if (this.optionSelectionnee === "option2") {
        this.medias.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (this.optionSelectionnee === "option3") {
        this.medias.sort((a, b) => a.title.localeCompare(b.title));
      }
      // Ajoute chaque média trié au conteneur
      this.medias.forEach((media, index) => {
        // Crée un template de média avec MediaFactory
        const template = MediaFactory.create(
          media,
          this.photographer,
          this.medias
        );
        const mediaDOM = template.getDOM();
        mediaContainer.appendChild(mediaDOM);

        //  écouteur d'événements au clic sur un élément de média
        mediaDOM.querySelector(".media-link").addEventListener("click", (e) => {
          e.preventDefault();
          this.index = index;

          this.updateLightbox();
          lightbox.showModal(); //afficher la lightbox
        });
        // Ajouter l'événement pour fermer le lightbox
        const lightbox = document.getElementById("lightbox");
        lightbox.addEventListener("click", (event) => {
          if (event.target === lightbox) {
            lightbox.close();
          }
        });
      });
    }
  }
  //met à jour l'affichage du nombre total de likes
  updateLikes() {
    const section = document.querySelector(".likes-footer");
    const likes = section.querySelector(".likes");
    likes.textContent = this.photographer.totalLikes;
    const priceElement = section.querySelector(".price");
    priceElement.textContent =
      this.photographer.price + " €" + " " + "/" + "jour";
  }
  displayMediaLikes() {
    document.addEventListener("mediaLikes", this.updateLikes.bind(this));
    let totalLikes = 0;
    for (let i = 0; i < this.medias.length; i++) {
      totalLikes += this.medias[i].likes;
    }
    this.photographer.totalLikes = totalLikes;
    this.updateLikes();
  }
  // mettre à jour la lightbox
  updateLightbox() {
    // Récupère le média actuel
    const indexMedia = this.medias[this.index];
    const lightbox = document.querySelector("#lightbox");
    const imgElement = lightbox.querySelector("#lightboxImage");
    const videoElement = lightbox.querySelector("#lightboxVideo");
    const titleText = lightbox.querySelector("#title");
    // Cache les éléments par défaut
    imgElement.style.display = "none";
    videoElement.style.display = "none";

    if (indexMedia) {
      // Affiche le titre du média
      titleText.textContent = indexMedia.title;
      // Si c'est une image, affiche l'élément image
      if (indexMedia.image) {
        imgElement.src = `assets/medias/${indexMedia.photographerId}/${indexMedia.image}`;
        imgElement.alt = indexMedia.title;
        imgElement.style.display = "block"; // afficher l'élément image s'il y en a un
      }
      // Si c'est une vidéo, affiche l'élément vidéo
      else if (indexMedia.video) {
        videoElement.src = `assets/medias/${indexMedia.photographerId}/${indexMedia.video}`;
        videoElement.alt = indexMedia.title;
        videoElement.style.display = "block";
      } else {
        console.error("La mise à jour de la lightbox a échoué.");
      }
    }
  }

  // Gestion des touches du clavier
  handleKeyPress(event) {
    const lightbox = document.querySelector("#lightbox");
    // La structure switch examine la touche pressée
    if (lightbox.open)
      switch (event.key) {
        // Si la touche est la flèche droite
        case "ArrowRight":
          // Appelle la fonction pour afficher le média suivant dans la lightbox
          this.lightboxNext();
          break;
        // Si la touche est la flèche gauche
        case "ArrowLeft":
          // Appelle la fonction pour afficher le média précédent dans la lightbox
          this.lightboxPrevious();
          break;
      }
  }
  // Afficher le média suivant dans la lightbox
  lightboxNext() {
    this.index = (this.index + 1) % this.medias.length;
    this.updateLightbox();
  }
  // Afficher le média précédent dans la lightbox
  lightboxPrevious() {
    this.index = (this.index - 1 + this.medias.length) % this.medias.length;
    this.updateLightbox();
  }
}

const app = new App();
app.init();
