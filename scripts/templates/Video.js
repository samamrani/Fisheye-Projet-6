import { MediaTemplate } from "./Media.js";

// La classe Video hérite de la classe Media
export class VideoTemplate extends MediaTemplate {
  // crée et retourne un élément video
  createElement() {
    const video = document.createElement("video");
    video.setAttribute(
      "src",
      `assets/medias/${this.media.photographerId}/${this.media.video}`
    );
    video.setAttribute("title", this.media.title);
    video.setAttribute("aria-label", this.media.title);
    return video;
  }
}
