const contents_recipes = document.querySelectorAll('.content_recipe')
const rows = document.querySelectorAll('.row')
const locale = location.pathname;
const links = document.querySelectorAll('.links');


for(let link of links){
    if(locale.includes(link.getAttribute('href')))
    link.classList.add('active');
    console.log(locale);
}


for(let content_recipe of contents_recipes){
    content_recipe.addEventListener('click', function(){
        let idPage = content_recipe.getAttribute('id')
        window.location = `/recipes/${idPage}`

    })
}

for(let row of rows){
    const button = row.querySelector('.button')
    button.addEventListener('click', function(){
        if(button.innerHTML == "ESCONDER"){
            row.querySelector('.display').classList.add('hide')
            button.innerHTML = 'MOSTRAR'
        }else if(button.innerHTML == "MOSTRAR"){
            row.querySelector('.display').classList.remove('hide')
            button.innerHTML = 'ESCONDER'
        }  
    })
}

function addIngredient(){
    const ingredients = document.querySelector('#ingredient');
    const fieldIngredient = document.querySelectorAll('.ingredient');

    const newIngredient = fieldIngredient[fieldIngredient.length -1].cloneNode(true);

    if(newIngredient.value == "") return false;

    newIngredient.value = "";
    ingredients.appendChild(newIngredient);
    
}

document
.querySelector('#addIngredient')
.addEventListener("click", addIngredient);

function addPass(){
    const steps = document.querySelector('.steps');
    const fieldPass = document.querySelectorAll('.pass');
    
    const newPass = fieldPass[fieldPass.length - 1].cloneNode(true);

    if(newPass.value == "") return false;

    newPass.value = "";
    steps.appendChild(newPass);
}
document
.querySelector("#addPass")
.addEventListener("click", addPass);

function checkInputs(){
    const ingredients = document.querySelector('#ingredient');
    const steps = document.querySelector('.steps');
    const inputVoidIngredient = document.querySelector('.ingredient');
    const inputVoidPass = document.querySelector('.pass');

    for(let input of inputVoidIngredient){
        if(input.value == "")
        ingredients.removeChild(input);
    }

    for(let input of inputVoidPass){
        if(input.value == "")
        steps.removeChild(input);
    }
}

document
.querySelector(".button.check")
.addEventListener("click", checkInputs);

function deleteRecipe(){
    const formDelete = document.querySelector('.form-remove');
    formDelete.submit();
    console.log(formDelete);
}
document
.querySelector(".delete")
.addEventListener("click", deleteRecipe);

