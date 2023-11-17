//Mettre le code JavaScript lié à la page photographer.html
//je recupere le tableau du fichier json dans dossier data

async function getPhotographers() {
  const reponse = await fetch("data/photographers.json");
  const photographers = await reponse.json();
}

async function getData() {
  const reponse = await fetch("data/photographers.json");
  const data = await reponse.json();
  console.log(data);
  return data;
}

//Gestion des donnée
async function init() {
  //je recupere Data
  const { photographers, media } = await getData();

  //je recupere Url
  const catchUrl = new URL(window.location);
  const getParams = new URLSearchParams(catchUrl.search);

  //je recuperation Id dans Url
  const targetParams = getParams.get("id");
}
