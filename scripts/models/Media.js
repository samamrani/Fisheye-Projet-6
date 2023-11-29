export class Media {
  //Le constructeur prend un objet media qui represent données du média
  constructor(media) {
    //le chemin vers le répertoire des médias et l'Id du photographe.
    this.path = `assets/medias/${media.photographerId}`;
    this.media = media;
  }

  // Méthode getMediaDOM crée et retourne l'élément DOM représentant le média
  getMediaDOM() {
    // Création d'un élément <figure> qui encapsulera le média
    const figure = document.createElement("figure");

    // Appel à la méthode abstraite createElement pour créer le média spécifique (image, vidéo, etc.)
    const media = this.createElement();
    media.className = "media";
    figure.appendChild(media);

    // Création d'un élément <figcaption> pour contenir le titre, les likes et l'icône du cœur
    const figcaption = document.createElement("figcaption");

    // Création de l'icône du cœur
    const icon = document.createElement("i");
    icon.className = "fa-regular fa-heart icon";
    icon.style.color = "red";

    // Création d'un élément <span> pour afficher le nombre de likes
    const likes = document.createElement("span");
    likes.className = "likes";
    likes.textContent = this.media.likes;

    // Ajout du titre, du nombre de likes et de l'icône du cœur à <figcaption>
    figcaption.appendChild(document.createTextNode(` ${this.media.title}`));
    figcaption.appendChild(likes);
    figcaption.appendChild(icon);
    figure.appendChild(figcaption);

    // Renvoi de l'élément <figure> complet représentant le média
    return figure;
  }

  // Méthode abstraite pour créer le média spécifique (doit être implémentée dans les sous-classes)
  createElement() {}
}
