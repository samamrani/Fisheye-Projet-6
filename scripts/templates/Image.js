import { MediaTemplate } from "./Media.js";

//classe Image hérite de la classe Media
export class ImageTemplate extends MediaTemplate {
  //crée et retourne un élément img (image HTML)
  createElement() {
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `assets/medias/${this.media.photographerId}/${this.media.image}`
    );
    img.setAttribute("alt", this.media.title);
    img.setAttribute("aria-label", this.media.title);

    return img;
  }
}
