const mongoose = require('mongoose');
const User = require('./user');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    datedue:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true        
    }
});

mongoose.model('Task', taskSchema);