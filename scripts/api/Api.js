export class Api {
  // Lorsque le constructeur est appelé, il prend cet argument
  //  (data) et le stocke dans la propriété this._data.
  constructor(url) {
    this._url = url;
  }

  async fetch() {
    try {
      /*fetch(this._data) pour envoyer une requête HTTP. this._data doit 
      être une URL ou un objet de requête compatible avec l'API Fetch. */
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

  async getPhotographers() {
    return (await this.fetch()).photographers;
  }

  async getPhotographer(id) {
    const photographers = await this.getPhotographers();

    return photographers.find((item) => item.id === id);
  }
}
