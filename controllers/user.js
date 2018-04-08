const pug = require('pug');
const bcrypt = require('bcrypt');


const User = require('../models/user.js');

async function index(req,res) {
    let text = './views/users/allUser.pug';
    let renderIndex = pug.compileFile(text);
    let users = await User.findAll();

    let html = renderIndex({
        title: "Formulaire d'ajout d'utilisateur",
        users: users
    });

    res.writeHead(200, { 'Content-Type': 'text/html' } )
    res.write(html);
    res.end();
}

/** Fonction qui ajoute un Todo dans la base. */
async function postUser(req,res) {
    const salt = 10;
    let header = req["headers"]["content-type"];
    let name = req.body.name;
    let password = bcrypt.hashSync(req.body.password, salt);
    let json = {
        name:name,
        password:password,
    }
    User.create(json);
    if(header == "application/json") {        
        res.json(json);
    }
    else {
        let users = await User.findAll();
    console.log(users);
        return res.redirect(301,"http://localhost:8080/users");
    }
    
}

function loginPage(req,res) {
    let text="./views/users/login.pug";
    let renderLogin = pug.compileFile(text);

    let html = renderLogin({
        title: "Page de connexion"
    })

    res.writeHead(200, { 'Content-Type': 'text/html' } )
    res.write(html);
    res.end();
}
module.exports = {index, postUser, loginPage}