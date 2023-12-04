import { Api } from "./Api.js";

export class PhotographerApi {
  // Récupère uniquement les photographes
  constructor() {
    this.api = new Api("data/photographers.json");
  }
  async getPhotographers() {
    return (await this.api.fetch()).photographers;
  }

  // Récupère uniquement les informations d'un photographe
  async getPhotographer(id) {
    const photographers = await this.getPhotographers();
    return photographers.find((item) => item.id === id);
  }
}
