const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {

    //Bearer kas9aks09aks0a9skas90kas09as
    const token = req.query.token || req.params.token;

    if(!token)
        res.redirect('/user/login');
        //return res.status(401).send({error: 'No token provided'});
    /*
    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        res.redirect('/user/login');
       // return res.status(401).send({error: 'Token error'});
    
    const [scheme , token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        res.redirect('/user/login');
        //return res.status(401).send({error: 'Token malformatted'});
    */
    jwt.verify(token, authConfig.secret, (err, decoded)=>{
        if(err) return res.redirect('/user/login');

        req.userid = decoded.id;
        req.token = token;
        return next();
    })
}