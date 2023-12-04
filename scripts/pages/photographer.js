import { PhotographerApi } from "../controleurApi/Photographer.js";
import { MediaApi } from "../controleurApi/Media.js";
import { initForm } from "../utils/contactForm.js";
import { MediaFactory } from "../factories/MediaFactory.js";
import { FooterDisplay } from "../vueTemplates/FooterDisplay.js";
class App {
  constructor() {
    const params = new URL(document.location).searchParams;
    this.id = parseInt(params.get("id"));
    this.photographerApi = new PhotographerApi();
    this.mediaApi = new MediaApi();
    this.photographer = null;
    this.footerDisplay = new FooterDisplay();
  }

  async init() {
    this.photographer = await this.photographerApi.getPhotographer(this.id);
    console.log("Après getPhotographer", this.photographer);
    console.log(this.id);
    initForm(this.photographer);
    await this.displayPhotographerHeader();
    await this.displayMediasMain();
    await this.displayMediafooter();
  }

  //Méthode displayPhotographer
  async displayPhotographerHeader() {
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
    const medias = await this.mediaApi.getMedias(this.id);
    const mediaContainer = document.querySelector(".media-container");

    medias.forEach((media) => {
      const template = MediaFactory.create(media);
      mediaContainer.appendChild(template.getMediaDOM());
    });
  }
  /***************** */

  async displayMediafooter() {
    const medias = await this.mediaApi.getMedias(this.id);
    const totalLikes = this.photographer.totalLikes || 0;
    console.log("Medias:", medias);

    const footerDisplay = new FooterDisplay(this.photographer);

    footerDisplay.totalLikes(totalLikes);
    footerDisplay.displayFooter(); // Appel pour mettre à jour le DOM
  }
}

const app = new App();
app.init();
