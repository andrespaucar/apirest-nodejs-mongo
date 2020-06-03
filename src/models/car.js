const mongoose = require('mongoose')
const CompanySchema = require('../models/company')
const carShema = new mongoose.Schema({
    /*company :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company' 
    },*/
    company:{
        type: CompanySchema,
        required: true
    },  
    model : String,
    sold: Boolean,
    price: {
        type : Number,
        required : function(){
            return this.sold
        }
    },
    year:{
        type: Number,
        min: 2000,
        max : 2030
    },
    extras : [String],
    date: {
        type : Date,
        default: Date.now
    }
})

const Car = mongoose.model('car',carShema)

module.exports = Car