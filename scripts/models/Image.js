import { Media } from "./Media.js";

//classe Image hérite de la classe Media
export class Image extends Media {
  //Image. Elle crée et retourne un élément img (image HTML)
  //Méthode createElement
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
