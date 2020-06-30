const express = require('express')
const nunjucks = require('nunjucks')


const server = express()
const data = require('./data')

server.use(express.static(__dirname + '/public'))

server.set('view engine', 'njk')
nunjucks.configure('views',{
    express:server,
    autoescape:false,
    noCache:true
})

server.get('/', function(req, res){
    res.render('index', { items: data })
})
server.get('/recipes', function(req, res){
    res.render('recipes', {items: data})
})
server.get('/recipes/:index',function(req, res){;
    const recipes = [...data]
    const recipeIndex = req.params.index
    res.render('recipe', {item: recipes[recipeIndex] })
})
server.get('/about', function(req, res){
    res.render('about')
})


server.listen(5000, function(){

})