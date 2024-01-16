const servicesCards = document.querySelector("#services-cards");
const BASE_URL = `http://localhost:8080/products`;

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
  servicesCards.innerHTML = "";
  data.forEach((element) => {
    const cardElement = document.createElement("div");
    cardElement.className = "services-card";
    cardElement.innerHTML = `
    <img src="${element.imgUrl}" alt="" />
    <h2>${element.name}</h2>
    <p>${element.desc}</p>
  <div class="deleteIcon" onclick="deleteCard(${element.id},this)">  <i class="fa-solid fa-trash"></i></div>

    `;
    servicesCards.append(cardElement);
  });
}

async function deleteCard(id,btn){
try {
    await axios(`${BASE_URL}/${id}`)
    btn.closest(".services-card").remove()
} catch (error) {
    console.log(error);
}
}