import { ImageTemplate } from "../templates/Image.js";
import { VideoTemplate } from "../templates/Video.js";
export class MediaFactory {
  //Une méthode statique appelée create
  static create(media, photographer) {
    // Logique de création d'instance
    if (media.image) {
      return new ImageTemplate(media, photographer);
    } else if (media.video) {
      return new VideoTemplate(media, photographer);
    }
  }
}
