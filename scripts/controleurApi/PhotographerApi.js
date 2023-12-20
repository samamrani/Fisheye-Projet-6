import { Api } from "./Api.js";

// Classe enfant
export class PhotographerApi extends Api {
  constructor() {
    // Appel du constructeur de la classe parent avec super
    super("data/photographers.json");
  }
  async getPhotographers() {
    return (await this.fetch()).photographers;
  }

  // Récupère uniquement les informations d'un photographe
  async getPhotographer(id) {
    const photographers = await this.getPhotographers();
    return photographers.find((item) => item.id === id);
  }
}
