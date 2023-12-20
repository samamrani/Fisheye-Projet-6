import { ImageTemplate } from "../models/Image.js";
import { VideoTemplate } from "../models/Video.js";
export class MediaFactory {
  //Une méthode statique appelée create
  static create(media, photographer) {
    if (media.image) {
      return new ImageTemplate(media, photographer);
    } else if (media.video) {
      return new VideoTemplate(media, photographer);
    }
  }
}
