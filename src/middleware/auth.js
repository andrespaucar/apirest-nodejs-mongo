const jwt = require('jsonwebtoken')
function auth(req,res,next){
    const jwtToken = req.header('Authorization')
    if(!jwtToken) return res.status(401).send('Acceso Denegado. Necesitamos un token')

    try {
        const payload = jwt.verify(jwtToken, 'paswordclave')
        req.user = payload
        next()
    } catch (e) {
        res.status(400).send('Acceso Denegado. Token no Valido')
    }
}

module.exports = auth