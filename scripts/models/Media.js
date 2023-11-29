import { Image } from "./Image.js";

export class MediaTemplate {
  constructor(data) {
    const { id, photographerId, title, image, video, likes, date, price } =
      data;

    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.image = image ? `assets/media/images/${image}` : null;
    this.video = video ? `assets/media/videos/${video}` : null;
    this.likes = likes;
    this.date = date;
    this.price = price;
  }

  getMediaDOM() {
    const figure = document.createElement("figure");

    if (this.image) {
      const img = new Image(
        this.image,
        `Photo: ${this.title}`,
        "Étiquette ARIA pour l'image"
      ).createImageElement();
      figure.appendChild(img);
    } else if (this.video) {
      // Si c'est une vidéo, vous pouvez créer un élément vidéo au lieu d'une image
      const video = document.createElement("video");
      video.src = this.video;
      video.alt = `Vidéo: ${this.title}`;
      video.controls = true; // Ajoutez des contrôles pour la lecture/pause
      figure.appendChild(video);
    }

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = `${this.title}, ${this.likes} likes`;

    figure.dataset.mediaId = this.id;

    // Ajoutez d'autres éléments du DOM selon vos besoins

    return figure;
  }
}
