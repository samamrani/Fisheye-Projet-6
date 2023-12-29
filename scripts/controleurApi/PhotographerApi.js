import { Api } from "./Api.js";

// Classe enfant
export class PhotographerApi extends Api {
  constructor() {
    // Appel du constructeur de la classe parent avec super
    super("data/photographers.json");
  }
  // récupérer la liste complète des photographes
  async getPhotographers() {
    // Récupère les données à partir de l'URL et retourne la liste des photographes
    return (await this.fetch()).photographers;
  }

  // Récupère uniquement les informations d'un photographe
  async getPhotographer(id) {
    // Récupère la liste complète des photographes
    const photographers = await this.getPhotographers();
    // Recherche et renvoie le photographe correspondant à l'ID
    return photographers.find((item) => item.id === id);
  }
}
