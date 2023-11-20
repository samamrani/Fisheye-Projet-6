function photographerTemplate(data) {
  const { id, name, city, country, tagline, price, portrait } = data;

  const picture = `assets/images/photographers_id_photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "Portrait du photographe");
    // aria-label est utilisé pour fournir une étiquette descriptive
    // à un élément lorsqu'aucun texte visible n'est associé à cet élément
    img.setAttribute("aria-label", "Étiquette ARIA pour l'image");

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const h3 = document.createElement("h3");
    h3.textContent = city + "," + " " + country;
    h3.style.color = "#901c1c";
    h3.style.fontSize = "16px";

    const p = document.createElement("p");
    p.textContent = tagline;
    p.style.fontSize = "12px";

    const span = document.createElement("span");
    span.textContent = price + "€" + "/jour";
    span.style.fontSize = "10px";

    // création du lien
    const lien = document.createElement("a");
    lien.href = `photographer.html?id=${id}`;

    lien.appendChild(img);
    lien.appendChild(h2);

    article.dataset.photographerId = id;

    // ajout des éléments à l'article
    article.appendChild(lien);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);

    return article;
  }
  return { id, name, picture, getUserCardDOM };
}
