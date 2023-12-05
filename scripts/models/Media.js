export class MediaModel {
  //Le constructeur prend un objet media qui represent données du média
  constructor(media) {
    //le chemin vers le répertoire des médias et l'Id du photographe.
    this.path = `assets/medias/${media.photographerId}`;
    this.media = media;
    this.liked = false;
  }

  // Méthode getMediaDOM crée et retourne l'élément DOM représentant le média
  getMediaDOM() {
    // Création d'un élément <figure> qui encapsulera le média
    const figure = document.createElement("figure");
    const media = this.createElement(); // Appel à la méthode abstraite createElement
    media.className = "media";
    figure.appendChild(media);

    // Création d'un élément <figcaption> pour contenir le titre, les likes et l'icône du cœur
    const figcaption = document.createElement("figcaption");

    const titleText = document.createElement("span"); // Créer un élément span pour le titre
    titleText.style.whiteSpace = "nowrap";
    titleText.style.overflow = "hidden";
    titleText.style.textOverflow = "ellipsis";
    titleText.style.width = "292px";

    const iconLikes = document.createElement("div");

    const likes = document.createElement("span"); // Création le nombre de likes
    likes.className = "likes";
    likes.textContent = this.media.likes;

    const iconSolide = document.createElement("i"); // Création de l'icône du cœur
    iconSolide.className = "fa-solid fa-heart iconSolide";

    iconLikes.appendChild(likes);
    iconLikes.appendChild(iconSolide);

    // Ajout du titre, du nombre de likes et de l'icône du cœur à <figcaption>
    titleText.appendChild(document.createTextNode(`${this.media.title}`));
    figcaption.appendChild(titleText);
    figcaption.appendChild(iconLikes);
    figure.appendChild(figcaption);

    // gestionnaire d'événements pour le clic sur le bouton de like
    iconLikes.addEventListener("click", async () => {
      this.mediaClick();

      // Ajoutez la classe pour déclencher l'effet de rotation
      iconSolide.classList.add("clicked");

      // Retirez la classe après un certain délai
      setTimeout(() => {
        iconSolide.classList.remove("clicked");
      }, 200);
    });

    return figure;
  }

  mediaClick() {
    // Inverser l'état du like
    this.Liked = !this.Liked;

    // Mettre à jour le nombre de likes en conséquence
    this.media.likes = this.Liked ? this.media.likes + 1 : this.media.likes - 1;

    // Déclencher un événement avec le nombre total de likes
    const mediaLikesChangedEvent = new CustomEvent("mediaLikes", {
      detail: {
        totalLikes: this.media.likes,
      },
    });

    // console.log("Media Clicked. Total Likes:", this.media.likes);
    document.dispatchEvent(mediaLikesChangedEvent);
  }

  createElement() {}
}
