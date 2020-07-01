const contents_recipes = document.querySelectorAll('.content_recipe')
const rows = document.querySelectorAll('.row')

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
