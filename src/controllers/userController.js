const mongoose = require('mongoose');
const User = mongoose.model('User');
//auth
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');


function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = {
    async list(req, res){
        const users = await User.find();

        res.json(users);
    },
    async store(req, res){
        const user = await User.create(req.body);

        //Escondendo campo 'senha' na resposta da requisição
        user.password = undefined;

        const token = 'Bearer '+ generateToken({id: user.id});

        res.redirect('/task/home?token='+token);
    },
    async delete(req, res){
        const user = User.findByIdAndDelete(req.params.id);

        res.json(user);
    },
    async authenticate(req, res){
        const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password');

        if(!user)
            return res.status(400).send({error: 'User not found'});
        
        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({error: 'Invalid password'});    
        
        user.password = undefined;

        const token = generateToken({id: user.id});

        res.redirect('/task/home?token='+token);

    }

}