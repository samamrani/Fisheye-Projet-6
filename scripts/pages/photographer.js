import { Api } from "../api/Api.js";
import { initForm } from "../utils/contactForm.js";
import { MediaFactory } from "../factories/MediaFactory.js";

class App {
  constructor() {
    const params = new URL(document.location).searchParams;
    this.id = parseInt(params.get("id"));
    this.api = new Api("data/photographers.json");
    this.photographer = null;
  }

  async init() {
    this.photographer = await this.api.getPhotographer(this.id);

    initForm(this.photographer);
    await this.displayPhotographer();
    await this.displayMedias();
  }

  async displayPhotographer() {
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

  async displayMedias() {
    const medias = await this.api.getMedias(this.id);

    const mediaContainer = document.querySelector(".media-container");

    medias.forEach((media) => {
      const template = MediaFactory.create(media);
      mediaContainer.appendChild(template.getMediaDOM());
    });
  }
}

const app = new App();

app.init();
