import { Api } from "./Api.js";

export class PhotographerApi extends Api {
  // Récupère uniquement les photographes
  constructor() {
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
