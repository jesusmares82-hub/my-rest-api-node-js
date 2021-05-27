const jwt = require("jsonwebtoken");

const verifyToken = ((req, res, next) => {
    const token = req.headers['authorization'];
    
    let tokenDivi = token.split(' ');
    let newtoken = [];
    tokenDivi.forEach(values => {
        if (values != "Bearer") {
            newtoken.push(values)
        }
    });
    tokenEnd = newtoken.join();
    console.log(tokenEnd);
    if (tokenEnd) {
        jwt.verify(tokenEnd, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token inválido' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no proporcionado.'
        });
    }
});

module.exports = verifyToken;