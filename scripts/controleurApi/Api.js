export class Api {
  constructor(url) {
    this._url = url;
  }
  async fetch() {
    try {
      const response = await fetch(this._url);
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
