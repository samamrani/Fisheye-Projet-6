import { PhotographerApi } from "../controleurApi/PhotographerApi.js";
import { PhotographerModel } from "../models/Photographer.js";
import { PhotographerTemplate } from "../templates/Photographer.js";
class App {
  constructor() {
    this.photographers = [];
  }
  async init() {
    const photographerApi = new PhotographerApi();
    this.photographers = await photographerApi.getPhotographers();
    this.displayData();
  }
  //affiche le photographe dans le DOM
  displayData() {
    const photographersSection = document.querySelector(
      ".photographer_section"
    );
    this.photographers.forEach((photographer) => {
      const photographerModel = new PhotographerModel(photographer);
      const photographerTemplate = new PhotographerTemplate(photographerModel);
      const userCardDOM = photographerTemplate.getDOM();
      photographersSection.appendChild(userCardDOM);
    });
  }
}
const app = new App();
app.init();
