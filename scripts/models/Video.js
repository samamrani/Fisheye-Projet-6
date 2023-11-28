class Video {
  // Le constructeur est appelé
  constructor(title, video) {
    this.title = title; // Propriété pour le titre de la vidéo
    this.video = video; // Propriété pour la source de la vidéo (URL du fichier vidéo)
  }

  // Méthode pour obtenir le code HTML de la vidéo
  getVideoHTML() {
    return `
        <video controls>
          <source src="${this.video}" type="video/mp4">
         
        </video>
        <h3>${this.title}</h3>
      `;
  }
}

// Exemple d'utilisation de la classe Video
const videoInstance = new Video("Sample Video", "assets/media/video.mp4");

// Obtenez le code HTML de la vidéo à partir de la méthode de la classe
const videoHTML = videoInstance.getVideoHTML();

// Ajoutez le code HTML de la vidéo à un élément sur la page (par exemple, un conteneur avec l'ID "video-container")
const videoContainer = document.getElementById("video-container");
videoContainer.innerHTML = videoHTML;
