export class PhotographerTemplate {
  //// Destructuration des données--pour initialiser les propriétés de l'instance
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

  //Méthode getUserCardDOM::: méthodes DOM pour créer et configurer les éléments HTML
  getUserCardDOM() {
    // Création de l'élément <article> pour représenter la carte du photographe
    const article = document.createElement("article");

    // Création de l'élément <img> pour afficher le portrait du photographe
    const image = document.createElement("img");
    image.setAttribute("src", this.picture);
    image.setAttribute("alt", "Portrait du photographe");

    // Ajout d'une étiquette ARIA pour l'accessibilité
    image.setAttribute("aria-label", "Étiquette ARIA pour l'image");

    // Création de l'élément <h2> pour afficher le nom du photographe
    const h2 = document.createElement("h2");
    h2.textContent = this.name;

    // Création de l'élément <h3> pour afficher la ville et le pays du photographe
    const h3 = document.createElement("h3");
    h3.textContent = this.city + "," + " " + this.country;

    // Création de l'élément <p> pour afficher la tagline du photographe
    const p = document.createElement("p");
    p.textContent = this.tagline;

    // Création de l'élément <span> pour afficher le prix par jour du photographe
    const span = document.createElement("span");
    span.textContent = this.price + "€" + "/jour";

    // Création d'un lien (<a>) pointant vers la page du photographe
    const lien = document.createElement("a");
    lien.href = `photographer.html?id=${this.id}`;

    // Ajout de l'image et du nom du photographe au lien
    lien.appendChild(image);
    lien.appendChild(h2);

    article.dataset.photographerId = this.id;

    // ajout des éléments à l'article
    article.appendChild(lien);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);

    // Renvoi de l'élément <article> complet représentant la carte du photographe
    return article;
  }
}
