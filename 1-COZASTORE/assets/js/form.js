const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

const BASE_URL = `http://localhost:8080/products`;

const id = new URLSearchParams(window.location.search).get("id");
console.log(id);

async function fillForm() {
  const res = await axios(`${BASE_URL}/${id}`);
  console.log(res.data);
  inputs[0].value = res.data.name;
  inputs[1].value = res.data.description;
  inputs[2].value = res.data.image;
}
if (id) {
  fillForm();
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let obj = {
    name: inputs[0].value,
    description: inputs[1].value,
    img: `../image${inputs[2].value.split("\\"[1])}`,
  };
  if (!id) {
    axios.post(`${BASE_URL}`,obj);
  } else {
    axios.patch(`${BASE_URL}`,obj);
  }
  inputs.forEach((item) => (item.value = ""));
});
