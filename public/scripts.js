const contents_recipes = document.querySelectorAll('.content_recipe')

for(let content_recipe of contents_recipes){
    content_recipe.addEventListener('click', function(){
        let idPage = content_recipe.getAttribute('id')
        window.location = `/recipes/${idPage}`
        
    })
}
