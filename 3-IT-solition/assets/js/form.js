const form = document.querySelector(".form-element");
const inputs = document.querySelectorAll("input");
console.log(form);
const BASE_URL = `http://localhost:8000/products`;
const id = new URLSearchParams(window.location.search).get("id");
console.log(id);

async function fillForm() {
  const res = await axios(`${BASE_URL}/${id}`);
  console.log(res.data);
  inputs[0].value = res.data.imgUrl;
  inputs[1].value = res.data.name;
  inputs[2].value = res.data.desc;
}
if (id) {
  fillForm();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let obj = {
    imgUrl: `../image${inputs[0].value.split()}`,
    name: inputs[1].value,
    desc: inputs[2].value,
  };
  console.log(obj);
  if (!id) {
    axios.post(`${BASE_URL}`, obj);
  }
  inputs.forEach((item) => (item.value = ""));
});
