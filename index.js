const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
const cors = require('cors');

//Iniciar o app
const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//Iniciando o banco de dados
mongoose.connect('mongodb://todolist:todolist123@ds129045.mlab.com:29045/todolist',{
    useNewUrlParser: true
});

//models
requireDir('./src/models');

//rotas
app.use('/', require('./src/routes/task'));
app.use('/task', require('./src/routes/task'));
app.use('/user', require('./src/routes/user'));

//setando nossa engine de view
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//Ouvindo porta
const port = process.env.PORT || 3001
app.listen(port, err => {
    if(err){
        console.log('error');
    }else{
        console.log('Server is running on port 3001...');
    }
});
