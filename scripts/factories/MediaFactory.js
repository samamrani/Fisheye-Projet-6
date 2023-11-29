import { Image } from "../models/Image.js";
import { Video } from "../models/Video.js";

export class MediaFactory {
  static create(media) {
    if (media.image) {
      return new Image(media);
    } else if (media.video) {
      return new Video(media);
    }
  }
}
