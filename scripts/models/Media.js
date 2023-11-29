export class Media {
  constructor(media) {
    this.path = `assets/medias/${media.photographerId}`;
    this.media = media;
  }

  getMediaDOM() {
    const figure = document.createElement("figure");

    const media = this.createElement();
    media.className = "media";
    figure.appendChild(media);

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = `${this.media.title}, ${this.media.likes} likes`;

    figure.appendChild(figcaption);

    return figure;
  }

  createElement() {}
}
