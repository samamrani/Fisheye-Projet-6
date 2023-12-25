export class MediaTemplate {
  //Le constructeur prend un objet media qui represent données du média
  constructor(media, photographer, app) {
    //le chemin vers le répertoire des médias et l'Id du photographe.
    this.path = `assets/medias/${media.photographerId}`;
    this.media = media;
    this.photographer = photographer;
    this.app = app;
  }

  // Méthode getMediaDOM crée et retourne l'élément DOM représentant le média
  getDOM() {
    // Création d'un élément <figure> qui encapsulera le média
    const figure = document.createElement("figure");
    const media = this.createElement(); // Appel à la méthode abstraite createElement
    media.className = "media";
    figure.appendChild(media);

    // Création d'un élément <figcaption> pour contenir le titre, les likes et l'icône du cœur
    const figcaption = document.createElement("figcaption");

    const titleText = document.createElement("span"); // Créer un élément span pour le titre
    titleText.textContent = this.media.title;

    const iconLikes = document.createElement("div");
    const likes = document.createElement("span"); // Création le nombre de likes
    likes.className = "likes";
    likes.textContent = this.media.likes;

    const iconSolide = document.createElement("i"); // Création de l'icône du cœur
    iconSolide.className = "fa-solid fa-heart iconSolide";

    iconLikes.appendChild(likes);
    iconLikes.appendChild(iconSolide);

    figcaption.appendChild(titleText);
    figcaption.appendChild(iconLikes);
    figure.appendChild(figcaption);

    // gestionnaire d'événements pour le clic sur le bouton de like
    iconLikes.addEventListener("click", () => {
      this.mediaClick();

      likes.textContent = this.media.likes;
    });

    return figure;
  }

  mediaClick = () => {
    this.liked = !this.liked;
    // Mettre à jour le nombre de likes
    if (this.liked) {
      this.media.likes = this.media.likes + 1;
      this.photographer.totalLikes++;
    } else {
      this.media.likes = this.media.likes - 1;
      this.photographer.totalLikes--;
    }
    // Déclencher un événement avec le nombre total de likes
    const mediaLikesChangedEvent = new CustomEvent("mediaLikes", {
      detail: {
        totalLikes: this.media.likes,
      },
    });
    document.dispatchEvent(mediaLikesChangedEvent);
  };

  createElement() {}
}
