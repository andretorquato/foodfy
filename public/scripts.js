const PhotosUpload = {
  input: "",
  preview: document.querySelector("#photos-preview"),
  uploadLimit: 6,
  files: [],
  handleFileInput(event) {
    const { files: fileList } = event.target;
    PhotosUpload.input = event.target;

    if (PhotosUpload.hasLimit(event)) return;

    Array.from(fileList).forEach((file) => {
      PhotosUpload.files.push(file);
      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const div = PhotosUpload.getContainer(image);

        if (PhotosUpload.preview) {
          PhotosUpload.preview.appendChild(div);
        }
      };
      reader.readAsDataURL(file);
    });
  },
  hasLimit(e) {
    const { uploadLimit, input, preview } = PhotosUpload;
    const { files: fileList } = input;

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} imagens`);
      event.preventDefault();
      return true;
    }

    const photosDiv = [];
    if (preview) {
      preview.childNodes.forEach((item) => {
        if (item.classList && item.classList.value == "photo")
          photosDiv.push(item);
      });

      const totalPhotos = fileList.length + photosDiv.length;
      if (totalPhotos > uploadLimit) {
        alert("Você atingiu o limite máximo de fotos");
        event.preventDefault();
        return true;
      }
    }
    return false;
  },
  getAllFiles() {
    const dataTransfer =
      new ClipboardEvent("").clipboardData || new DataTransfer();

    PhotosUpload.files.forEach((file) => dataTransfer.items.add(file));

    return DataTransfer.files;
  },
  getContainer(image) {
    const div = document.createElement("div");
    div.classList.add("photo");

    div.onclick = PhotosUpload.removePhoto;

    div.appendChild(image);

    div.appendChild(PhotosUpload.getRemoveButton());

    return div;
  },
  getRemoveButton() {
    const button = document.createElement("i");
    button.classList.add("material-icons");
    button.innerHTML = "close";

    return button;
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode;
    const photosArray = Array.from(PhotosUpload.preview.children);
    const index = photosArray.indexOf(photoDiv);

    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();

    photoDiv.remove();
  },
  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode;

    if (photoDiv.id) {
      const removedFiles = document.querySelector(
        'input[name="removed_files"]'
      );
      if (removedFiles) {
        removedFiles.value += `${photoDiv.id},`;
      }
    }
    photoDiv.remove();
  },
};
const configPages = {
  locale: location.pathname,
  links: document.querySelectorAll(".links"),
  linksActive() {
    configPages.links.forEach((link) => {
      if (configPages.locale.includes(link.getAttribute("href")))
        link.classList.add("active");
    });
  },
  redirectRecipes() {
    const contents_recipes = document.querySelectorAll(".content_recipe");

    if (contents_recipes) {
      const rows = document.querySelectorAll(".row");
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
    }
  },
  configForm() {
    const formDelete = document.querySelector(".form-delete");
    const deleteButton = document.querySelector("#button-delete");
    const pageEdit = document.querySelector("#addIngredient");

    if (formDelete && deleteButton) {
      deleteButton.addEventListener("click", function () {
        confirmDelete();
      });
    }

    if (pageEdit) {
      document
        .querySelector("#addIngredient")
        .addEventListener("click", addIngredient);

      document.querySelector("#addPass").addEventListener("click", addPass);

      document
        .querySelector("#form-edit")
        .addEventListener("submit", checkInputs);
    }
  },
  paginateActive() {
    const paginate = document.querySelector(".paginate");

    if (paginate) {
      createPaginate(paginate);
    }
  },
};
configPages.linksActive();
configPages.redirectRecipes();
configPages.configForm();
configPages.paginateActive();

const ImageGallery = {
  highlight: document.querySelector(".gallery .highlight > img"),
  previews: document.querySelectorAll(".gallery-preview > img"),
  setImage(e) {
    const { target } = e;
    ImageGallery.previews.forEach((preview) =>
      preview.classList.remove("active")
    );
    target.classList.add("active");

    ImageGallery.highlight.src = target.src;
  },
};

const Validate = {
  apply(input, func) {
    Validate.clearErros(input);

    let results = Validate[func](input.value);

    if (results.error) Validate.displayError(input, results.error);
  },
  displayError(input, error) {
    const div = document.createElement("div");
    div.classList.add("error");
    div.innerHTML = error;
    input.parentNode.appendChild(div);
    input.classList.add("border-error");
    input.focus();
  },
  clearErros(input) {
    const errorDiv = input.parentNode.querySelector(".error");
    const allBorders = document.querySelectorAll(".border-error");

    if (errorDiv) errorDiv.remove();
    allBorders.forEach((input) => input.classList.remove("border-error"));
  },
  isEmail(value) {
    let error = null;

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!value.match(mailFormat)) error = "Email invalido";

    return {
      error,
      value,
    };
  },
};
function addPass() {
  const steps = document.querySelector(".steps");
  const fieldPass = document.querySelectorAll(".pass");

  const newPass = fieldPass[fieldPass.length - 1].cloneNode(true);

  if (newPass.value == "") return false;

  newPass.value = "";
  steps.appendChild(newPass);
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
function confirmDelete() {
  const confirmation = confirm("Você realmente deseja deletar?");
  const formDelete = document.querySelector(".form-delete");
  if (!confirmation) event.preventDefault();
  else formDelete.submit();
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
