const express = require('express')

const {Company} = require('../models/company')

const router = express.Router()
const {validationResult,check} = require('express-validator')

router.get('/',async(req,res)=>{
    const company = await Company.find()
    res.send(company)
})

router.get('/list', async (req,res) =>{
    const company = await Company.find()
    res.send(company)
})
router.get('/:id',async(req,res)=>{
    const company = await Company.findById(req.params.id)
    if(!company) return res.status(404).send('No hemos encontrado la empresa con ese ID')
    res.send(company)
})

router.post('/',[
    check('name').isLength({min:2}),
    check('country').isLength({min :1})
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(404).json({errors : errors.array()})
    const company = new Company({
        name : req.body.name,
        country : req.body.country
    })

    const result = await company.save()
    res.status(201).send(result)  
})

router.put('/:id',[
    check('name').isLength({min:1}),
    check('country').isLength({min :2})
], async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(404).json({errors : errors.array()})
    const company = await Company.findByIdAndUpdate(req.params.id,{
        name : req.body.name,
        country : req.body.country
    },
    {
        new : true
    })

    if(!company) return res.status(404).send('La empresa con ese ID no esta')
    res.status(204).send()

})

router.delete('/:id',async(req,res) =>{
    const company = await Company.findByIdAndDelete(req.params.id)
    if(!company) return res.status(404).send('La empresa con ese ID no esta, no se puede borrar')
    res.status(200).send('Empresa borrado')

})

module.exports = router