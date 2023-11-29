export class Api {
  // Lorsque le constructeur est appelé, il prend cet argument
  //  (url) et le stocke dans la propriété this._url.
  constructor(url) {
    this._url = url;
  }

  async fetch() {
    try {
      /*fetch(this._url) pour envoyer une requête HTTP. this._data  */
      const response = await fetch(this._url);
      /*await response.json() pour extraire et retourner
       les données au format JSON de la réponse. */
      return await response.json();
      /*Si une erreur se produit pendant l'exécution du bloc try, elle est 
      capturée dans le bloc catch, et une nouvelle erreur est levée */
    } catch (error) {
      throw new Error(error);
    }
  }

  // Récupère uniquement les photographes
  async getPhotographers() {
    return (await this.fetch()).photographers;
  }

  // Récupère uniquement les informations d'un photographe
  async getPhotographer(id) {
    const photographers = await this.getPhotographers();
    return photographers.find((item) => item.id === id);
  }

  // Récupère les médias en rapport avec un photographe
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
