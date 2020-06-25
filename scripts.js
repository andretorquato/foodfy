const modalRecipes = document.querySelector('.modalRecipes')
const contents_recipes = document.querySelectorAll('.content_recipe')
const modal = document.querySelector('.subModal')
for(let content_recipe of contents_recipes){
    content_recipe.addEventListener('click', function(){
        let dataForModal = content_recipe.innerHTML
        modal.innerHTML = `${dataForModal}`
        modalRecipes.classList.remove('hide')
        
    })
}

document.querySelector('.close_modal').addEventListener('click', function(){
    modalRecipes.classList.add('hide')
    
})