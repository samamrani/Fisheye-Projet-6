export class Modal {
  constructor(target) {
    // Initialise la propriété "target" avec la valeur passée en paramètre
    this.target = target;
    this.modal = document.querySelector(target);
  }

  display() {
    this.modal.showModal();
  }

  close() {
    this.modal.close();
  }
}
