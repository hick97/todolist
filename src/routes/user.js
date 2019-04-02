const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');

//Rota
routes.get('/login', (req, res)=>{
    res.render('login');
});

routes.get('/signup', (req, res)=>{
    res.render('signup');
});

routes.post('/nova',  userController.store);

routes.get('/list', userController.list);

routes.get('/delete/:id', userController.delete);

routes.post('/authenticate', userController.authenticate);

module.exports = routes;