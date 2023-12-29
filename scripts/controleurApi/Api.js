//effectuer des requêtes HTTP simples et récupérer des données JSON à partir d'une API.
export class Api {
  // Constructeur prenant l'URL de l'API en paramètre
  constructor(url) {
    this._url = url;
  }

  async fetch() {
    try {
      // Effectue une requête HTTP GET à l'URL spécifiée
      const response = await fetch(this._url);
      // Retourne les données JSON
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
