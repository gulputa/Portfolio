const menuIcon = document.querySelector(".menu");
const navBar = document.querySelector("nav");
const header = document.querySelector("header");
const cards = document.querySelector(".card-popular");

const BASE_URL = `http://localhost:8080/products`;

menuIcon.addEventListener("click", function () {
  navBar.classList.toggle("show");
  this.classList.contains("fa-bars")
    ? (this.className = "fa-solid fa-x")
    : (this.className = "fa-solid fa-bars");
});

window.addEventListener("scroll", function () {
  header.classList.toggle("header-scroll", window.scrollY > 0);
});

async function getAllProducts() {
  try {
    const res = await axios(`${BASE_URL}`);
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
    cardElement.className = "card-pro";
    cardElement.innerHTML = `
        <img src="${element.imgUrl}" alt="" />
        <h2>${element.name}</h2>
        <p>${element.desc}</p>
        <div class="card-outhor">
          <img src="./assets/image/author.jpg" alt="" />
          <p>Michael Smith, Author</p>
          <h1>$29</h1>
        </div>
        <div class="deleteIcon" onclick="deleteCard(${element.id},this)">  <i class="fa-solid fa-trash"></i></div>
        `;
    cards.append(cardElement);
  });
}
async function deleteCard(id, btn) {
  console.log(id);
  try {
    if (confirm("silmek isteyrsen")) {
        await axios(`${BASE_URL}/${id}`);
        btn.closest(".card-pro").remove();
        
    }
  } catch (error) {
    console.log(error);
  }
}
