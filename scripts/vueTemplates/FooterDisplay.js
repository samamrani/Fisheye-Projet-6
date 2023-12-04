export class FooterDisplay {
  constructor(photographer) {
    this.photographer = photographer;

    // Écouter l'événement de changement de likes
    document.addEventListener(
      "change mediaLikes",
      this.handleLikesChanged.bind(this)
    );
  }

  totalLikes(totalLikes) {
    // Mettre à jour le total des likes du photographe
    this.photographer.totalLikes = totalLikes;
    this.displayFooter();
  }

  displayFooter() {
    const section = document.querySelector(".likes-footer");

    const likes = section.querySelector(".likes");
    likes.textContent = this.photographer.totalLikes;

    const priceElement = section.querySelector(".price");
    priceElement.textContent =
      this.photographer.price + " €" + " " + "/" + "jour";
  }
  handleLikesChanged(event) {
    // Mettre à jour le total des likes dans le footer
    const updatedTotalLikes = event.detail.totalLikes;
    this.totalLikes(updatedTotalLikes);
  }
}
