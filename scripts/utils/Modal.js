export class Modal {
  constructor(target) {
    // Initialise la propriété id avec la valeur en paramètre
    this.target = target;
    this.modal = document.querySelector(target);
  }
  // Méthode pour afficher le modal
  display() {
    // this.modal.style.display = "block";
    this.modal.showModal();
  }

  // Méthode pour fermer le modal
  close() {
    // this.modal.style.display = "none";
    this.modal.close();
  }
}
