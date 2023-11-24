// Déclaration de la classe Image
export class Image {
  // Le constructeur de la classe Image
  constructor(src, alt, ariaLabel) {
    this.src = src;
    this.alt = alt;
    this.ariaLabel = ariaLabel;
  }
  // Méthode createImageElement
  createImageElement() {
    const img = document.createElement("img");
    img.setAttribute("src", this.src);
    img.setAttribute("alt", this.alt);
    img.setAttribute("aria-label", this.ariaLabel);
    return img;
  }
}
