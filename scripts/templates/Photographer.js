export class PhotographerTemplate {
  constructor(photographerModel) {
    this.photographer = photographerModel;
  }

  getDOM() {
    const article = document.createElement("article");
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    const image = document.createElement("img");
    image.setAttribute("src", this.photographer.picture);
    image.setAttribute(
      "alt",
      "Portrait du photographe " + this.photographer.name
    );
    image.setAttribute(
      "aria-label",
      "Portrait du photographe " + this.photographer.name
    );

    imageContainer.appendChild(image);

    // gestionnaire d'événements pour le clic sur l'image
    imageContainer.addEventListener("click", () => {
      imageContainer.classList.toggle("clicked");
    });

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

    lien.appendChild(imageContainer);
    lien.appendChild(h2);

    //attribut dataset stocKer l'ID
    article.dataset.photographerId = this.id;

    article.appendChild(lien);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);

    return article;
  }
}
