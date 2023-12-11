// document.addEventListener("DOMContentLoaded", function () {
//   // déclarez les variables globales et récupérez l'élément DOM
//   let list = [];
//   let current = -1;
//   const lightbox = document.getElementById("lightbox");
//   const previousButton = lightbox.querySelector(".lightbox_prev");
//   const nextButton = lightbox.querySelector(".lightbox_next");
//   const closeButtonElement = lightbox.querySelector(".lightbox_close");
//   const figure = lightbox.querySelector(".figure");

//   // Fonction pour mettre à jour la lightbox
//   const updateLightbox = (index) => {
//     console.log("Dans updateLightbox");

//     if (index >= 0 && index < list.length) {
//       // Le code à exécuter lorsque l'index est valide
//       console.log("Index valide :", index);

//       // Mettez à jour la lightbox en fonction de l'index
//       current = index;
//       const media = list[index];
//       figure.innerHTML = `<img src="assets/media/${media.photographerId}/${media.image}" alt="${media.alt}">`;
//     } else {
//       console.error("Valeur d'index non valide !");
//     }
//   };

//   // Fonction pour passer au média précédent de la lightbox
//   const previousLightbox = () => {
//     if (current > 0) {
//       updateLightbox(current - 1);
//     }
//   };

//   // Fonction pour passer au média suivant de la lightbox
//   const nextLightbox = () => {
//     if (current < list.length - 1) {
//       updateLightbox(current + 1);
//     }
//   };

//   // Gestionnaire d'événement pour les boutons de fermeture, précédent, suivant
//   closeButtonElement.addEventListener("click", () => {
//     closeLightbox();
//   });

//   previousButton.addEventListener("click", () => {
//     previousLightbox();
//   });

//   nextButton.addEventListener("click", () => {
//     nextLightbox();
//   });
// });
