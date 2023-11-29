// import {
//   getPhotographers,
//   findPhotographerById,
// } from "../pages/photographer.js";
import { displayModal, closeModal } from "./displayCloseModal.js";

export const contactForm = document.forms["contact"];

export function initForm(photographer) {
  /*--------------la gestion du formulaire--------------*/
  // Récupérez les données du photographe au chargement de la page
  //const photographersCadre = await getPhotographers();
  //const photographers = photographersCadre.photographers;

  // Récupérez l'ID du photographe à partir des paramètres de l'URL
  //let params = new URL(document.location).searchParams;
  //let id = parseInt(params.get("id"));

  //const selectedPhotographer = findPhotographerById(photographers, id);

  // Mettez à jour le nom du photographe dans le formulaire
  const photographerForm = document.getElementById("photographer_name");
  photographerForm.textContent = photographer.name;

  // Ajoutez un gestionnaire de clic au bouton "Contactez-moi"
  const contactButton = document.querySelector(".contact_button");
  contactButton.addEventListener("click", function () {
    // Utilisez la fonction pour mettre à jour le nom du photographe
    // photographerName(selectedPhotographer.name);
    // Ouvrez le formulaire modal
    displayModal();
  });

  // Ajoutez un événement de soumission au formulaire
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement

    // Récupérez les données du formulaire
    const firstName = contactForm.elements["first"].value;
    const lastName = contactForm.elements["last"].value;
    const email = contactForm.elements["email"].value;
    const message = contactForm.elements["message"].value;

    console.log("Nom du photographe:", photographer.name);
    console.log("Prénom:", firstName);
    console.log("Nom:", lastName);
    console.log("Email:", email);
    console.log("Message:", message);

    // Réinitialise le formulaire après l'envoi
    contactForm.reset();
    // Fermez le formulaire après le traitement
    closeModal();
  });
}
