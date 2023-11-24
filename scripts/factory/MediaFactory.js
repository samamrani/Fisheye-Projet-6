import { Image } from "../models/Image.js";
import { Video } from "../models/Video.js";

// Définition de la classe MediaFactory
export class MediaFactory {
  // Méthode createMedia
  static createMedia(datas) {
    // switch examine la valeur
    switch (type_de_media) {
      case "image":
        return new Image(datas);
      case "video":
        return new Video(datas);
      default:
        throw new Error("Le media n'est pas pris en charge");
    }
  }
}
