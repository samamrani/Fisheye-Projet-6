import { ImageTemplate } from "../templates/Image.js";
import { VideoTemplate } from "../templates/Video.js";

/*MediaFactory créer des instances de médias 
(image ou vidéo) en fonction des propriétés d'un objet media*/
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
