import { Image } from "../models/Image.js";

export class PhotographerTemplate {
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

  getUserCardDOM() {
    const article = document.createElement("article");

    const img = new Image(
      this.picture,
      "Portrait du photographe",
      "Étiquette ARIA pour l'image"
    ).createImageElement();

    const h2 = document.createElement("h2");
    h2.textContent = this.name;

    const h3 = document.createElement("h3");
    h3.textContent = this.city + "," + " " + this.country;

    const p = document.createElement("p");
    p.textContent = this.tagline;

    const span = document.createElement("span");
    span.textContent = this.price + "€" + "/jour";

    // création du lien
    const lien = document.createElement("a");
    lien.href = `photographer.html?id=${this.id}`;

    lien.appendChild(img);
    lien.appendChild(h2);

    article.dataset.photographerId = this.id;

    // ajout des éléments à l'article
    article.appendChild(lien);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);

    return article;
  }
}
