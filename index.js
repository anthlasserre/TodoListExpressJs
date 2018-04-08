/** Importation de packages nécessaires */
const express = require('express');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require('path');
const qs = require('querystring');
const session = require('express-session');

/** Importation des models de Todo et User */
const Todo = require('./models/todo.js');
const User = require('./models/user.js');

/** Importation des controllers de Todo et User */
const todoController = require('./controllers/todo.js');
const userController = require('./controllers/user.js');

const app = express();
const PORT = process.env.PORT||8080;

/** Configuration de l'application express */
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/'));
app.use(session({secret: 'secret'}));

let sess; 

app.get('/',function(req,res){
    sess = req.session;
    sess.name = "bite";
    console.log(sess)
});

/** Renvoie la liste des Todos. */
app.get('/todos', (req,res) => {
    todoController.index(req,res);
});

/** Renvoie le formulaire d'ajout de Todo. */
app.get('/todos/add', (req,res) => {
    todoController.getAddTodoPage(req,res);
});

/** Ajout d'un todo en récupérant les infos du formulaire. */
app.post('/todos', (req,res) => {
    todoController.postTodo(req,res);
});

/** Renvoie les infos d'un Todo en fonction de l'id passé en paramètre. */
app.get('/todos/:todoId', (req,res) => {
    let header = req["headers"]["content-type"];
    if(header == "application/json") {
        todoController.getIdTodoJson(req,res);
    }
    else {
        todoController.getIdTodoPage(req,res);
    }
});

/** DELETE Route pour supprimer un Todo */
app.delete('/todos/:todoId',(req,res) => {
    todoController.deleteTodo(req,res);
});

/** Renvoie la page de modification d'un Todo */
app.get('/todos/:todoId/edit', (req,res) => {
    todoController.getPatchTodoPage(req,res);
});

/** PATCH Route pour modifier un Todo */
app.patch('/todos/:todoId', (req,res) => {
    todoController.patchTodo(req,res);
});

app.get('/users', (req,res) => {
    userController.index(req,res);
});

app.get('/users/add', (req,res) => {
    userController.loginPage(req,res);
});

app.post('/users', (req,res) => {
    //userController.postUser(req,res);
    console.log(req.body.name);
    console.log(req.body.password);
});

/** Renvoie un JSON avec un status code 404 */
app.use(function(req, res, next) {
    res.status(404);
    res.json({status:404,title:"Not Found",msg:"Route not found"});
    next();
});

app.listen(PORT,() => {
    console.log("Serveur sur port : " + PORT);
});