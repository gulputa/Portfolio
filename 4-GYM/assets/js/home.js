const menuIcon = document.querySelector(".menu");
const navBar = document.querySelector("nav");
const header = document.querySelector("header");
const cards = document.querySelector(".gym-cards");
const search = document.querySelector("input");
const sort = document.querySelector("button");

const BASE_URL = ` http://localhost:8080/products`;
let productsData = [];
let copyProductsData = [];

menuIcon.addEventListener("click", function () {
  navBar.classList.toggle("show");
  this.classList.contains("fa-bars fa-bars")
    ? (this.className = "fa-solid fa-xmark")
    : (this.className = "fa-solid fa-bars");
});

window.addEventListener("scroll", function () {
  header.classList.toggle("header-scroll", window.scrollY > 0);
});

async function getAllProducts() {
  try {
    const res = await axios(`${BASE_URL}`);
    productsData = res.data;
    copyProductsData = res.data;
    drawCards(res.data);
  } catch (error) {
    console.log(error);
  }
}
getAllProducts();

function drawCards(data) {
    console.log(data);
  cards.innerHTML = "";
  data.forEach((element) => {
    const cardElement = document.createElement("div");
    cardElement.className = "gym-card";
    cardElement.innerHTML = `
    <img src="${element.imgUrl}" alt="" />
    <h1>${element.name}</h1>
    <p>
     ${element.desc}
    </p>
    <div class="icon">
    <div class="deleteIcon" onclick=deleteCard("${element.id}",this)>  <i class="fa-solid fa-trash"></i></div>
      <i class="fa-regular fa-heart"></i>
    </div>
    `;
    cards.append(cardElement);
  });
}

async function deleteCard(id, btn) {
  try {
    if (confirm("silmek isdeyirsen")) {
      await axios.delete(`${BASE_URL}/${id}`);
      btn.closest(".gym-card").remove();
    }
  } catch (error) {
    console.log(error);
  }
}

search.addEventListener("input", async function (e) {
  try {
    console.log(e.target.value);
    const res = await axios(`${BASE_URL}`);
    let filtered = res.data.filter((item) => {
      return item.name
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    });
    drawCards(filtered);
  } catch (error) {
    console.log(error);
  }
});
sort.addEventListener("click", function () {
  let sorted;
  if (this.innerText === "Ascending") {
    sorted = productsData.sort((a, b) => a.price - b.price);
    this.innerText = "Descending";
  } else if (this.innerText === "Descending") {
    sorted = productsData.sort((a, b) => b.price - a.price);
    this.innerText = "Default";
  } else {
    sorted = copyProductsData;
    this.innerText = "Ascending";
  }
  //   console.log(sorted);
  drawCards(sorted);
});
