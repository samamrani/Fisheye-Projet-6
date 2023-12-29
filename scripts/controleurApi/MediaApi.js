import { Api } from "./Api.js";
export class MediaApi extends Api {
  //appelant le constructeur de la classe parent
  constructor() {
    super("data/photographers.json");
  }
  // récupérer les médias d'un photographe en fonction de son ID
  async getMedias(photographerId) {
    //   // Récupère les données à partir de l'URL
    const data = await this.fetch();
    // Récupère la liste des médias
    const medias = data.media;
    console.log(medias);

    // Filtre les médias en fonction de l'ID du photographe
    return medias.filter((item) => item.photographerId === photographerId);
  }

  // Récupère les informations d'un méda
  async getMedia(id) {
    // Récupère la liste des médias à partir de l'URL
    const medias = await this.fetch().media;
    // Recherche et renvoie le média correspondant à l'ID
    return medias.find((item) => item.id === id);
  }
}
