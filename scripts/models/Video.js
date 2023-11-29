import { Media } from "./Media.js";
//extends Media indique que la classe Video hérite de la classe Media
export class Video extends Media {
  //Méthode createElement:Elle crée et retourne un élément video
  createElement() {
    const video = document.createElement("video");
    video.setAttribute(
      "src",
      `assets/medias/${this.media.photographerId}/${this.media.video}`
    );
    video.setAttribute("title", this.media.metitle);
    video.setAttribute("aria-label", this.media.title);
    return video;
  }
}
