import { MediaApi } from "../controleurApi/MediaApi.js";
import { initForm } from "../utils/contactForm.js";
import { MediaFactory } from "../factories/MediaFactory.js";
import { PhotographerApi } from "../controleurApi/PhotographerApi.js";

class App {
  constructor() {
    const params = new URL(document.location).searchParams;

    this.id = parseInt(params.get("id"));
    this.photographerApi = new PhotographerApi();
    this.mediaApi = new MediaApi();
    this.photographer = null;
    this.list = [];
    this.current = -1;
    this.optionSelectionnee = null;
  }

  async init() {
    this.photographer = await this.photographerApi.getPhotographer(this.id);
    this.medias = await this.mediaApi.getMedias(this.id);
    if (!this.medias) {
      console.error("Erreur lors de la récupération des médias.");
      return;
    }
    initForm(this.photographer);
    this.displayPhotographerHeader();
    this.displayMediasMain();
    this.displayMediaLikes();
    this.updateLightbox();

    // écouteur d'événements au menu déroulant
    const selectMenu = document.getElementById("menuDeroulant");
    selectMenu.addEventListener("change", () => {
      // valeur de l'option sélectionnée
      this.optionSelectionnee = selectMenu.value;

      // Triez le tableau medias en fonction de l'option sélectionnée
      if (this.optionSelectionnee === "option1") {
        this.medias.sort((a, b) => b.likes - a.likes); // Triez par popularité (likes)
      } else if (this.optionSelectionnee === "option2") {
        this.medias.sort((a, b) => new Date(b.date) - new Date(a.date)); // Triez par date
      } else if (this.optionSelectionnee === "option3") {
        this.medias.sort((a, b) => a.title.localeCompare(b.title)); // Triez par titre
      }

      // Mettez à jour les medias affichés
      this.displayMediasMain();
    });
  }

  //Méthode displayPhotographer
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
    imgElement.setAttribute("aria-label", "Étiquette ARIA pour l'image");
  }

  //Méthode displayMedias
  async displayMediasMain() {
    const mediaContainer = document.querySelector(".media-container");

    // Vide le conteneur des médias avant d'ajouter les médias triés
    mediaContainer.innerHTML = "";

    // Trie les médias en fonction de l'option sélectionnée
    if (this.medias && this.medias.length > 0) {
      if (this.optionSelectionnee === "option1") {
        this.medias.sort((a, b) => b.likes - a.likes); // Triez par popularité (likes)
      } else if (this.optionSelectionnee === "option2") {
        this.medias.sort((a, b) => new Date(b.date) - new Date(a.date)); // Triez par date
      } else if (this.optionSelectionnee === "option3") {
        this.medias.sort((a, b) => a.title.localeCompare(b.title)); // Triez par titre
      }

      // Ajoute chaque média trié au conteneur
      this.medias.forEach((media) => {
        const template = MediaFactory.create(
          media,
          this.photographer,
          this.list
        );
        const mediaDOM = template.getDOM();
        mediaContainer.appendChild(mediaDOM);

        //  écouteur d'événements au clic sur un élément de média
        mediaDOM.querySelector(".media").addEventListener("click", () => {
          const index = this.list.indexOf(media);
          this.index = index;
          this.updateLightbox();
          lightbox.showModal();
        });
        // Ajouter l'événement pour fermer le lightbox
        const lightbox = document.getElementById("lightbox");
        lightbox.addEventListener("click", (event) => {
          if (event.target === lightbox) {
            lightbox.close();
          }
        });

        // le média à la liste
        this.list.push(media);
      });
    }
  }
  /***************** */
  updateLikes() {
    const section = document.querySelector(".likes-footer");

    const likes = section.querySelector(".likes");
    likes.textContent = this.photographer.totalLikes;

    const priceElement = section.querySelector(".price");
    priceElement.textContent =
      this.photographer.price + " €" + " " + "/" + "jour";
  }

  displayMediaLikes() {
    // recup l'événement de changement de likes
    document.addEventListener("mediaLikes", this.updateLikes.bind(this));
    // total des likes à partir des médias
    let totalLikes = 0;
    for (let i = 0; i < this.medias.length; i++) {
      totalLikes += this.medias[i].likes;
    }
    this.photographer.totalLikes = totalLikes;
    this.updateLikes();
  }

  // Méthode pour mettre à jour la lightbox
  updateLightbox = () => {
    const indexMedia = this.medias[this.index];
    const lightbox = document.querySelector("#lightbox");
    const imgElement = lightbox.querySelector("#lightboxImage");
    const videoElement = lightbox.querySelector("#lightboxVideo");

    const titleText = lightbox.querySelector("#title");

    imgElement.style.display = "none";
    videoElement.style.display = "none";

    if (indexMedia) {
      console.log(indexMedia);
      // console.log("imgElement:", imgElement);
      // console.log("videoElement:", videoElement);

      titleText.textContent = indexMedia.title; // Mettez à jour le titre avec le titre du média
      if (indexMedia.image) {
        imgElement.src = `assets/medias/${indexMedia.photographerId}/${indexMedia.image}`;
        imgElement.alt = indexMedia.title;
        imgElement.style.display = "block"; // afficher l'élément vidéo s'il y en a un
      } else if (indexMedia.video) {
        videoElement.src = `assets/medias/${indexMedia.photographerId}/${indexMedia.video}`;
        videoElement.alt = indexMedia.title;
        videoElement.style.display = "block"; // Afficher l'élément vidéo
      } else {
        console.error("La mise à jour de la lightbox a échoué.");
      }
    }
    const lightboxNextBtn = document.querySelector(".lightbox_next");
    const lightboxPrevBtn = document.querySelector(".lightbox_prev");
    const lightboxCloseBtn = document.querySelector("#lightboxCloseBtn");

    lightboxCloseBtn.addEventListener("click", () => {
      lightbox.close();
    });

    lightboxNextBtn.addEventListener("click", () => {
      this.lightboxNext();
    });

    lightboxPrevBtn.addEventListener("click", () => {
      this.lightboxPrevious();
    });
  };

  lightboxNext() {
    this.index = (this.index + 1) % this.medias.length;
    this.updateLightbox();
  }
  lightboxPrevious() {
    this.index = (this.index - 1 + this.medias.length) % this.medias.length;
    this.updateLightbox();
  }
}

const app = new App();
app.init();
