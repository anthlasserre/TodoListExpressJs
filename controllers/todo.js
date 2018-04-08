/** Importation de packages nécessaires */
const pug = require('pug');
const qs = require('querystring');
const moment = require('moment');

/** Importation du model de Todo */
const Todo = require('../models/todo.js');

/** Configuration de moment */
moment.locale('fr');

/** Fonction construisant la page d'accueil */
async function index(req,res) {
    let text = './views/todos/index.pug';
    let renderIndex = pug.compileFile(text);
    let todos = await Todo.findAll();

    let html = renderIndex({
        title: 'Todos',
        todos : todos
    });

    res.writeHead(200, { 'Content-Type': 'text/html' } )
    res.write(html);
    res.end();
}

/** Fonction construisant la page d'un Todo. */
async function getIdTodoPage(req,res) {
    let todoId = req.params.todoId;
    let text = './views/todos/idTodo.pug';
    let renderIndex = pug.compileFile(text);
    let todo = await Todo.findOne({
        where: { id: todoId }
    });

    let html = renderIndex({ title: 'Todos', todo : todo });

    res.writeHead(200, { 'Content-Type': 'text/html' } )
    res.write(html);
    res.end();
  }

/** Fonction renvoyant un JSON d'un Todo */
async function getIdTodoJson(req,res) {
    let todoId = req.params.todoId;
    let todo = await Todo.findOne({
        where: { id: todoId }
    });

    res.json(todo);
}

/** Fonction construisant la page de création de Todo */
async function getAddTodoPage(req,res) {
    let text = './views/todos/addTodo.pug';
    let renderAdd = pug.compileFile(text);
    let html = renderAdd({
        title: "Ajout d'un Todo"
    });

    res.writeHead(200, { 'Content-Type': 'text/html' } )
    res.write(html);
    res.end();
}

/** Fonction construisant la page de modification d'un Todo */
async function getPatchTodoPage(req,res) {
    let todoId = req.params.todoId;
    let todo = await Todo.findOne({
        where: { id: todoId }
    });
    let text = './views/todos/editTodo.pug';
    let renderEdit = pug.compileFile(text);
    let html = renderEdit({
        title : "Éditer un Todo",
        todo : todo
    });
    res.writeHead(200, { 'Content-Type': 'text/html' } )
    res.write(html);
    res.end();
}

/** Fonction qui ajoute un Todo dans la base. */
async function postTodo(req,res) {
    let header = req["headers"]["content-type"];
    let message = req.body.message;
    let heure = moment().format('LLL');
    let json = {
        message:message,
        completion:"undone",
        created: heure,
    }
    Todo.create(json);
    if(header == "application/json") {        
        res.json(json);
    }
    else {
        return res.redirect(301,"http://localhost:8080/todos");
    }
}

/** Fonction qui supprime un Todo dans la base. */
async function deleteTodo(req,res) {
    let idTodo = req.params.todoId;
    Todo.destroy({
        where: {
            id: idTodo
        }
    });
    let header = req["headers"]["content-type"];
    if(header == "application/json") {
        let json = {
            id:idTodo,
            status:'deleted'
        }
        res.json(json);    
    }
    else {
        return res.redirect(301,'/todos');  
    }
}

/** Fonction qui modifie un Todo dans la base. */
async function patchTodo(req,res) {
    let header = req["headers"]["content-type"];
    let todoId = req.params.todoId;
    let message = req.body.message;
    let completion = req.body.completion;
    let heure = moment().format('LLL');
    Todo.update({
        message : message,
        completion : completion,
        updated : heure
    }, {
    where: {
        id:todoId
        }
    });
    if(header == "application/json") {
        todoController.getIdTodoJson(req,res);
    }
    else {
        return res.redirect(301, '/todos');        
    }
}

  module.exports = {index, getIdTodoPage, getAddTodoPage, getIdTodoJson, 
    getPatchTodoPage, postTodo, deleteTodo, patchTodo};