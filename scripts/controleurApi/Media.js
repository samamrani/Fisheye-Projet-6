import { Api } from "./Api.js";

export class MediaApi {
  constructor() {
    this.api = new Api("data/photographers.json");
  }
  async getMedias(photographerId) {
    const data = await this.api.fetch();
    const medias = data.media;
    console.log(medias);
    return medias.filter((item) => item.photographerId === photographerId);
  }

  // Récupère les informations d'un méda
  async getMedia(id) {
    const medias = await this.api.fetch().media;
    return medias.find((item) => item.id === id);
  }
}
