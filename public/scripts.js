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

  document.querySelector("#addPass").addEventListener("click", addPass);

  document.querySelector("#form-edit").addEventListener("submit", checkInputs);
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

const deleteButton = document.querySelector("#button-delete");
if (deleteButton) {
  deleteButton.addEventListener("click", deleteRecipe);
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

// Algoritmo de paginação

function pagination(selectedPage, totalPages) {
  let pages = [],
    oldPage;

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

    if (
      firstAndLastPage ||
      (pagesBeforeSelectedPage && pagesAfterSelectedPage)
    ) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...");
      }
      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }

      pages.push(currentPage);

      oldPage = currentPage;
    }
  }
  return pages;
}
function createPaginate(paginate) {
  const filter = paginate.dataset.filter;
  const page = +paginate.dataset.page;
  const total = +paginate.dataset.total;
  const pages = pagination(page, total);
  let elements = "";

  for (let page of pages) {
    if (String(page).includes("...")) {
      elements += `<span>${page}</span>`;
    } else {
      if (filter) {
        elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
      } else {
        elements += `<a href="?page=${page}">${page}</a>`;
      }
    }
  }
  paginate.innerHTML = elements;
}
const paginate = document.querySelector(".paginate");

if (paginate) {
  createPaginate(paginate);
}
