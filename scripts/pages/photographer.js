import { PhotographerApi } from "../controleurApi/PhotographerApi.js";
import { MediaApi } from "../controleurApi/MediaApi.js";
import { initForm } from "../utils/contactForm.js";
import { MediaFactory } from "../factories/MediaFactory.js";
import { updateLikes } from "../vueTemplates/updateLikes.js";
class App {
  constructor() {
    const params = new URL(document.location).searchParams;
    this.id = parseInt(params.get("id"));
    this.photographerApi = new PhotographerApi();
    this.mediaApi = new MediaApi();
    this.photographer = null;
    this.updateLikes = new updateLikes(this);
  }

  async init() {
    this.photographer = await this.photographerApi.getPhotographer(this.id);
    // console.log("Après getPhotographer", this.photographer);
    // console.log(this.id);
    initForm(this.photographer);
    await this.displayPhotographerHeader();
    await this.displayMediasMain();
    await this.displayMediaLikes();
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

  async displayMediaLikes() {
    const medias = await this.mediaApi.getMedias(this.id);
    // const totalLikes = this.photographer.totalLikes || 0;
    console.log("Medias:", medias);
    // total des likes à partir des médias
    const totalLikes = medias.reduce((total, media) => total + media.likes, 1);

    this.updateLikes.totalLikes(totalLikes);
  }
}

const app = new App();
app.init();
