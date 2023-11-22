import {
  getPhotographers,
  findPhotographerById,
} from "../pages/photographer.js";

// Elements du DOM
const modal = document.getElementById("contact_modal");
const contactForm = document.forms["contact"];

// action pour ouvrir le modal
function displayModal() {
  modal.style.display = "block";
}

// actions pour fermer le modal
// function closeModal() {
//   modal.style.display = "none";
// }

// actions pour fermer le modal
window.closeModal = function () {
  modal.style.display = "none";
};

/*------------réinitialiser le formulaire---------------*/
function resetForm() {
  contactForm.reset();
}

/*-------mettre à jour le nom du photographe---*/
function photographerName(name) {
  // Affichez le nom du photographe dans le formulaire
  const photographerForm = document.getElementById("photographer_name");
  photographerForm.textContent = name;
}

/*--------------la gestion du formulaire--------------*/
document.addEventListener("DOMContentLoaded", async function () {
  // Récupérez les données du photographe au chargement de la page
  const photographersCadre = await getPhotographers();
  const photographers = photographersCadre.photographers;

  // Récupérez l'ID du photographe à partir des paramètres de l'URL
  let params = new URL(document.location).searchParams;
  let id = parseInt(params.get("id"));

  const selectedPhotographer = findPhotographerById(photographers, id);

  // Mettez à jour le nom du photographe dans le formulaire
  photographerName(selectedPhotographer.name);
  // Ajoutez un gestionnaire de clic au bouton "Contactez-moi"
  const contactButton = document.querySelector(".contact_button");
  contactButton.addEventListener("click", function () {
    // Utilisez la fonction pour mettre à jour le nom du photographe
    photographerName(selectedPhotographer.name);
    console.log(getPhotographers);
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

    // Récupérez le nom du photographe
    const photographerName =
      document.getElementById("photographer_name").textContent;

    console.log("Nom du photographe:", photographerName);
    console.log("Prénom:", firstName);
    console.log("Nom:", lastName);
    console.log("Email:", email);
    console.log("Message:", message);

    // Réinitialise le formulaire après l'envoi
    resetForm();
    // Fermez le formulaire après le traitement
    closeModal();
  });
});
