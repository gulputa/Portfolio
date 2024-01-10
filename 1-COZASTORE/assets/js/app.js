const cards = document.querySelector(".produtc-cards");
const BASE_URL = `http://localhost:8080/products`;
const search=document.querySelector(".search")
const sort=document.querySelector(".sort")

function getFavsFromLocaleStorage() {
  return JSON.parse(localStorage.getItem("favs")) || [];
}
let favCards = getFavsFromLocaleStorage();
let products = [];

async function getAllProducts() {
  try {
    const res = await axios(`${BASE_URL}`);
    products = res.data;
    console.log(res.data);
    drawCards(res.data);
  } catch (error) {
    console.log(error);
  }
}
getAllProducts();

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

async function deleteCard(id, btn) {
  console.log(id);
  try {
    await axios(`${BASE_URL}/${id}`);
    btn.closest(".card".remove());
  } catch (error) {
    console.log(error);
  }
}

function addToFavs(id, icon) {
  //   console.log(id);

  if (icon.className === "fa-solid fa-heart") {
    icon.className = "fa-regular fa-heart";
  } else {
    icon.className = "fa-solid fa-heart";
  }
  let favs = getFavsFromLocaleStorage();

  let product = products.find((item) => item.id === id);
  let index = favs.findIndex((item) => item.id === id);

  if (index === -1) {
    favs.push(product);
  } else {
    favs = favs.filter((item) => item.id !== id);
  }

  setProductToLocaleStorage(favs);
}
function setProductToLocaleStorage(favs) {
  localStorage.setItem("favs", JSON.stringify(favs));
}

search.addEventListener("input", async function (e) {
  console.log(e.target.value);
  const res = await axios(`${BASE_URL}`);
  let filtered = res.data.filter((item) => {
    return item.name
      .toLocalLowerCase()
      .includes(e.target.value.toLocalLowerCase());
  });
  drawCards(filtered);
});

sort.addEventListener("click", function () {
  let sorted;
  if (this.innerText === "Ascending") {
    sorted = users.sort((a, b) => a.id - b.id);
    this.innerText = "Descending";
  } else if (this.innerText === "Descending") {
    sorted = users.sort((a, b) => b.id - a.id);
    this.innerText = "Default";
  }
  drawCards(sorted);
});
