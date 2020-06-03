const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = express.Router()
const {check, validationResult} = require('express-validator')

router.get('/',async(req,res)=>{
    const users = await User.find()
    res.send(users)
})

router.get('/list',async(req,res) =>{
    const users = await User.find()
    res.send(users)
})

router.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send('No hemos encontrado al usuario')
    res.send(user)
})

router.post('/',[
    check('name').isLength({min:4}),
    check('email').isLength({min:5}),
    check('password').isLength({min:3})
],async (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})
    
    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('Usuario ya existe')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)

    user = new User({
        name : req.body.name,
        email : req.body.email,
        password:  hashPassword,
        isCustomer : false
    })
    const result = await user.save()
    // const jwtToken = jwt.sign({_id:user._id, name:user.name}, 'paswordclave')
    const jwtToken = user.generateJWT();
   
    res.status(201).header('Autorization',jwtToken).send({
        _id:user._id,
        name:user.name,
        email: user.email
    })
})
router.put('/:id',[
    check('name').isLength({min:4}),
    check('email').isLength({min:5})
],async (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})
    
    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('Usuario ya existe')
    
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)
    
    user = await User.findByIdAndUpdate(req.params.id,{
        name : req.body.name,
        email : req.body.email,
        password: hashPassword,
        isCustomer : req.body.isCustomer
     },{new:true})
    if(user) return res.status(404).send('El Usuario con ese ID no existe, para poder actualualizar')
     
    res.status(204).send({
        _id:user._id,
        name:user.name,
        email: user.email
    })
})

router.delete('/:id',async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user) return res.status(404).send('El Usuario con el ID no se encuentra')
    res.status(200).send('coche borrado')
})


module.exports = router