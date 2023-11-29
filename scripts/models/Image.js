import { Media } from "./Media.js";
export class Image extends Media {
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
