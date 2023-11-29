import { Media } from "./Media.js";

export class Video extends Media {
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
