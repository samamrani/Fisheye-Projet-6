import { Api } from "../helper/Api.js";
import { PhotographerTemplate } from "../models/Photographer.js";

class App {
  constructor() {
    this.photographers;
  }

  async init() {
    const api = new Api("data/photographers.json");
    this.photographers = (await api.fetch()).photographers;

    // console.log(this.photographers);
    // console.log("init");
    this.displayData();
  }

  async displayData() {
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

    this.photographers.forEach((photographer) => {
      const photographerModel = new PhotographerTemplate(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
    /**/
    //console.log(photographers);
  }
}

const app = new App();
app.init();
