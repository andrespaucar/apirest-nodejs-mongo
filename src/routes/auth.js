const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user') 
const router = express.Router()
const {check, validationResult} = require('express-validator')

router.post('/',[
    check('email').isLength({min:2}),
    check('password').isLength({min:3})
],async (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})
    
    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Usuario o contraseña incrorrectos')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Usuario o Contraseña incrorrecta')

    // const jwtToken = jwt.sign({_id:user._id, name:user.name}, 'paswordclave')
  
    const jwtToken = user.generateJWT();
   
    res.status(201).header('Autorization',jwtToken).send({
        _id:user._id,
        name:user.name,
        email: user.email
    })

    // res.send('Usuario y Contraseña correcta')
  
    
})
module.exports = router