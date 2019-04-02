const express = require('express');
const routes = express.Router();

const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/auth');

//Rota
routes.get('/', (req, res)=>{
    res.redirect('/home');
})

routes.get('/home', authMiddleware,  taskController.list);

routes.post('/nova/:token', authMiddleware, taskController.store);

routes.get('/editar/:id/:token', authMiddleware, taskController.updateForm);

routes.post('/editar/:id/:token', authMiddleware, taskController.update);

routes.get('/delete/:id/:token', authMiddleware, taskController.delete);

module.exports = routes;