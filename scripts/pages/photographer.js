import { PhotographerApi } from "../controleurApi/PhotographerApi.js";
import { MediaApi } from "../controleurApi/MediaApi.js";
import { initForm } from "../utils/contactForm.js";
import { MediaFactory } from "../factories/MediaFactory.js";

class App {
  constructor() {
    const params = new URL(document.location).searchParams;
    this.id = parseInt(params.get("id"));
    this.photographerApi = new PhotographerApi();
    this.mediaApi = new MediaApi();
    this.photographer = null;
  }

  async init() {
    this.photographer = await this.photographerApi.getPhotographer(this.id);
    this.medias = await this.mediaApi.getMedias(this.id);
    initForm(this.photographer);
    this.displayPhotographerHeader();
    this.displayMediasMain();
    this.displayMediaLikes();
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

    this.medias.forEach((media) => {
      const template = MediaFactory.create(media, this.photographer, this);
      const mediaDOM = template.getDOM();

      // gestionnaire d'événements au clic sur chaque élément média
      // mediaDOM.addEventListener("click", () => {
      //   this.openLightbox(medias, medias.indexOf(media));
      // });
      mediaContainer.appendChild(mediaDOM);
    });
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

  // Méthode pour afficher la lightbox
  // openLightbox(medias, index) {
  //   for (let i = 0; i < medias.length; i++) {
  //     if (i === index) {
  //       this.list = medias;
  //       this.updateLightbox(index);
  //       lightbox.showModal(); //methode afficher un dialogue avec IDlightbox
  //       return true;
  //     }
  //   }

  //   console.error("Valeur d'index non valide !");
  //   return false;
  // }
}

const app = new App();
app.init();
