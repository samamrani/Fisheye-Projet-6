export class MediaTemplate {
  //Le constructeur prend un objet media qui represent données du média
  constructor(media, photographer) {
    //le chemin vers le répertoire des médias et l'Id du photographe.
    this.path = `assets/medias/${media.photographerId}`;
    this.media = media;
    this.photographer = photographer;
  }

  // Méthode getMediaDOM crée et retourne l'élément DOM représentant le média
  getDOM() {
    // Création d'un élément <figure> qui encapsulera le média
    const figure = document.createElement("figure");
    const media = this.createElement(); // Appel à la méthode
    media.className = "media";

    const link = document.createElement("a");
    link.href = "#";
    link.className = "media-link";
    link.appendChild(media);
    figure.appendChild(link);

    // Création d'un élément <figcaption> pour contenir le titre, les likes et l'icône du cœur
    const figcaption = document.createElement("figcaption");

    const titleText = document.createElement("span"); // Créer un élément span pour le titre
    titleText.textContent = this.media.title;

    const iconLikes = document.createElement("div");
    const likes = document.createElement("span"); // Création le nombre de likes
    likes.className = "likes";
    likes.textContent = this.media.likes;

    const iconLink = document.createElement("a"); // Création de l'élément de lien pour l'icône du cœur
    iconLink.href = "#";
    iconLink.style.color = "#901c1c";

    const iconSolide = document.createElement("i"); // Création de l'icône du cœur
    iconSolide.className = "fa-solid fa-heart iconSolide";

    iconLikes.appendChild(likes);

    iconLink.appendChild(iconSolide);
    iconLikes.appendChild(iconLink);

    figcaption.appendChild(titleText);
    figcaption.appendChild(iconLikes);
    figure.appendChild(figcaption);

    // gestionnaire d'événements pour le clic sur le bouton de like
    iconLink.addEventListener("click", (e) => {
      e.preventDefault();
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
