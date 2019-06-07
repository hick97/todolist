const mongoose = require('mongoose');
const Task = mongoose.model('Task');
const User = mongoose.model('User');

module.exports = {
    async list(req, res){
        const userID = req.userid;
        const token = req.token;
        const user = await User.findById(userID);
        const tasks = await Task.find({user: userID}).populate('user', 'name _id').select();

        //res.json(tasks);
        res.render('index', {tasks, userID, user, token});
    },
    async store(req, res){
        const token = req.params.token;
        var d  = new Date(req.body.datedue);
        var monName = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio","Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");     
        const task = await Task.create({
            name: req.body.name,
            description: req.body.description,
            datedue: d.getDate() + " de " + monName[d.getMonth()] + " de " + d.getFullYear(),
            user: req.userid
        });
        return res.redirect('/home?token='+token);
    },
    async updateForm(req, res){
        const token = req.params.token;
        const task = await Task.findById(req.params.id);
        
        res.render('editar', {task, token});
    },
    async update(req, res){
        const token = req.params.token;
        var d  = new Date(req.body.datedue);
        var monName = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio","Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");     

        await Task.findByIdAndUpdate(req.params.id, {
            description: req.body.description,
            datedue: d.getDate() + " de " + monName[d.getMonth()] + " de " + d.getFullYear(),
        }, {new:true})

        res.redirect('/home?token='+token);
    },
    async delete(req, res){
        const token = req.params.token;
        await Task.findByIdAndDelete(req.params.id);

        res.redirect('/home?token='+token);
    }
}
