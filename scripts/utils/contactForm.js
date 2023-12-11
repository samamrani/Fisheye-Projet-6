import { Modal } from "./Modal.js";

// Initialisation du formulaire avec des données du photographe :
export function initForm(photographer) {
  const contactForm = document.forms["contact"];
  const photographerForm = document.getElementById("photographer_name");
  const modal = new Modal("#contact");

  photographerForm.textContent = photographer.name;

  // Gestionnaire de clic pour le bouton "Contactez-moi
  const contactButton = document.querySelector(".contact_button");
  contactButton.addEventListener("click", function () {
    modal.display();
  });

  // Gestionnaire de soumission du formulaire
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement

    // Récupérez les données du formulaire
    const firstName = contactForm.elements["first"].value;
    const lastName = contactForm.elements["last"].value;
    const email = contactForm.elements["email"].value;
    const message = contactForm.elements["message"].value;

    //Affichage des données dans la console
    console.log("Nom du photographe:", photographer.name);
    console.log("Prénom:", firstName);
    console.log("Nom:", lastName);
    console.log("Email:", email);
    console.log("Message:", message);

    // Réinitialise le formulaire après l'envoi
    contactForm.reset();
    modal.close();
  });

  // Gestionnaire de clic au bouton de fermeture du modal
  const closeBtn = document.querySelector(".modal-close-btn");
  closeBtn.addEventListener("click", function () {
    modal.close();
  });
}
