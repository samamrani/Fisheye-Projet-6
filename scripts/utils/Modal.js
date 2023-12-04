export class Modal {
  constructor(id) {
    this.id = id;
    this.modal = document.getElementById(this.id);
  }
  display() {
    this.modal.style.display = "block";
  }

  close() {
    this.modal.style.display = "none";
  }
}
