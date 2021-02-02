const contents_recipes = document.querySelectorAll(".content_recipe");
const rows = document.querySelectorAll(".row");
const locale = location.pathname;
const links = document.querySelectorAll(".links");

for (let link of links) {
  if (locale.includes(link.getAttribute("href"))) link.classList.add("active");
}

for (let content_recipe of contents_recipes) {
  content_recipe.addEventListener("click", function () {
    let idPage = content_recipe.getAttribute("id");
    window.location = `/recipes/${idPage}`;
  });
}

for (let row of rows) {
  const button = row.querySelector(".button");
  button.addEventListener("click", function () {
    if (button.innerHTML == "ESCONDER") {
      row.querySelector(".display").classList.add("hide");
      button.innerHTML = "MOSTRAR";
    } else if (button.innerHTML == "MOSTRAR") {
      row.querySelector(".display").classList.remove("hide");
      button.innerHTML = "ESCONDER";
    }
  });
}
const pageEdit = document.querySelector("#addIngredient");
if (pageEdit) {
  document
    .querySelector("#addIngredient")
    .addEventListener("click", addIngredient);

  document.
  querySelector("#addPass").
  addEventListener("click", addPass);

  document.
  querySelector(".delete").
  addEventListener("click", deleteRecipe);

  document.querySelector("#form-edit").
  addEventListener("submit", checkInputs);
  
}
function addIngredient() {
  const ingredients = document.querySelector("#ingredient");
  const fieldIngredient = document.querySelectorAll(".ingredient");

  const newIngredient = fieldIngredient[fieldIngredient.length - 1].cloneNode(
    true
  );

  if (newIngredient.value == "") return false;

  newIngredient.value = "";
  ingredients.appendChild(newIngredient);
}
function addPass() {
  const steps = document.querySelector(".steps");
  const fieldPass = document.querySelectorAll(".pass");

  const newPass = fieldPass[fieldPass.length - 1].cloneNode(true);

  if (newPass.value == "") return false;

  newPass.value = "";
  steps.appendChild(newPass);
}

function deleteRecipe() {
  const formDelete = document.querySelector(".form-remove");
  formDelete.submit();
}

function checkInputs() {
  const ingredients = document.querySelector("#ingredient");
  const steps = document.querySelector(".steps");
  const inputVoidIngredient = document.querySelectorAll(".ingredient");
  const inputVoidPass = document.querySelectorAll(".pass");

  for (let input of inputVoidIngredient) {
    if (input.defaultValue == "") ingredients.removeChild(input);
  }

  for (let input of inputVoidPass) {
    if (input.defaultValue == "") steps.removeChild(input);
  }
}


