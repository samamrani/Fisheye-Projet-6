import { Api } from "./Api.js";
export class MediaApi extends Api {
  constructor() {
    super("data/photographers.json"); //fehier JSON sera utilisé comme source de donnees pour API
  }
  async getMedias(photographerId) {
    const data = await this.fetch();
    const medias = data.media;
    console.log(medias);
    return medias.filter((item) => item.photographerId === photographerId);
  }

  // Récupère les informations d'un méda
  async getMedia(id) {
    const medias = await this.fetch().media;
    return medias.find((item) => item.id === id);
  }
}
