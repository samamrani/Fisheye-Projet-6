// Déclarations d'export au niveau supérieur du module
export function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
