/**PhotographerModel définit la structure d'un objet photographe avec ses différentes propriétés (id, nom, ville, pays, etc.).
Il est responsable de la gestion des données et de la logique métier associée à ces données. */

export class PhotographerModel {
  constructor(data) {
    const { id, name, city, country, tagline, price, portrait } = data;

    this.id = id;
    this.name = name;
    this.picture = `assets/photographers/${portrait}`;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
  }
}
