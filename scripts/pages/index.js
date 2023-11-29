import { Api } from "../api/Api.js";
import { PhotographerTemplate } from "../models/Photographer.js";

class App {
  constructor() {
    this.photographers;
  }

  //appelée au début de l'initialisation de l'application.
  async init() {
    //-async init-une instance de la classe Api avec le chemin vers le fichier JSON des photographes.
    const api = new Api("data/photographers.json");

    //la méthode getPhotographers de l'API pour récupérer les données des photographes.
    this.photographers = await api.getPhotographers();
    this.displayData();
  }

  //Méthode displayData::récupère l'élément DOM
  async displayData() {
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

    //la méthode forEach pour itérer sur chaque élément (photographe) du tableau this.photographers.
    this.photographers.forEach((photographer) => {
      // Pour chaque photographe, crée une instance de PhotographerTemplate
      const photographerModel = new PhotographerTemplate(photographer);

      // Appelle la méthode getUserCardDOM pour obtenir l'élément DOM du photographe
      const userCardDOM = photographerModel.getUserCardDOM();

      // Ajoute l'élément DOM du photographe à la section des photographes dans le document
      photographersSection.appendChild(userCardDOM);
    });
  }
}

//Création de l'Instance de l'Application et Appel de la Méthode init
const app = new App();
app.init();
