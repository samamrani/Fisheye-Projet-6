export class updateLikes {
  constructor(app) {
    this.app = app;

    // recup l'événement de changement de likes
    document.addEventListener("mediaLikes", this.likesChanged.bind(this));
  }

  totalLikes(totalLikes) {
    // Mettre à jour le total des likes du photographe
    this.app.photographer.totalLikes = totalLikes;
    this.updateLikes();
  }

  updateLikes() {
    const section = document.querySelector(".likes-footer");

    const likes = section.querySelector(".likes");
    likes.textContent = this.app.photographer.totalLikes;

    const priceElement = section.querySelector(".price");
    priceElement.textContent =
      this.app.photographer.price + " €" + " " + "/" + "jour";
  }

  likesChanged(event) {
    // Mettre à jour le total des likes
    const updatedTotalLikes = event.detail.totalLikes;
    this.totalLikes(updatedTotalLikes);
  }
}
