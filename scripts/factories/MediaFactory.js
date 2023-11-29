import { Image } from "../models/Image.js";
import { Video } from "../models/Video.js";

/*MediaFactory créer des instances de médias 
(image ou vidéo) en fonction des propriétés d'un objet media*/
export class MediaFactory {
  //Une méthode statique appelée create
  static create(media) {
    if (media.image) {
      return new Image(media);
    } else if (media.video) {
      return new Video(media);
    }
  }
}
/********************************************** */
// Définition de la classe MediaFactory
// export class MediaFactory {
//   // Méthode createMedia
//   static createMedia(datas) {
//     // switch examine la valeur
//     switch (type_de_media) {
//       case "image":
//         return new Image(datas);
//       case "video":
//         return new Video(datas);
//       default:
//         throw new Error("Le media n'est pas pris en charge");
//     }
//   }
// }
