export class PhotographerTemplate {
  constructor(photographerModel) {
    this.photographer = photographerModel;
  }

  getDOM() {
    const article = document.createElement("article");
    // Création de l'élément image
    const image = document.createElement("img");
    image.setAttribute("src", this.photographer.picture);
    image.setAttribute("alt", "Portrait du photographe");
    image.setAttribute("aria-label", "Étiquette ARIA pour l'image");

    const h2 = document.createElement("h2");
    h2.textContent = this.photographer.name;

    const h3 = document.createElement("h3");
    h3.textContent =
      this.photographer.city + "," + " " + this.photographer.country;

    const p = document.createElement("p");
    p.textContent = this.photographer.tagline;

    const span = document.createElement("span");
    span.textContent = this.photographer.price + "€" + "/jour";

    const lien = document.createElement("a");
    lien.href = `photographer.html?id=${this.photographer.id}`;

    lien.appendChild(image);
    lien.appendChild(h2);

    article.dataset.photographerId = this.id;

    article.appendChild(lien);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);

    return article;
  }
}
