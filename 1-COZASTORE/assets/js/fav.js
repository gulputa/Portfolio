const cards = document.querySelector(".produtc-cards");
const BASE_URL = `http://localhost:8080/products`;

function getFavsFromLocaleStorage() {
  return JSON.parse(localStorage.getItem("favs")) || [];
}

function drawCards(data) {
  cards.innerHTML = "";
  data.forEach((element) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.innerHTML = `
      <img src="${element.imgUrl}" alt="" />
      <div class="title">
        <p>${element.title}</p>
        <i class="${
          favCards.find((item) => item.id === element.id)
            ? "fa-solid fa-heart"
            : "fa-regular fa-heart"
        }" onclick="addToFavs(${element.id},this)"></i>
      </div>
        <div class="delete-icon" onclick="deleteCard(${element.id},this)">
        <i class="fa-solid fa-trash"></i>
        </div>
      </div>
      <span>$${element.price}</span>
      
      
      `;

    cards.append(cardElement);
  });
}


function setProductToLocaleStorage(favs) {
    localStorage.setItem("favs", JSON.stringify(favs));
  }