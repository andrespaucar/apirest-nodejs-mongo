const mongoose = require('mongoose')

const companyShema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
        minlength:1,
        maxlength: 99
    },
    country: String,
    date:{type: Date, default: Date.now}
})

const Company = mongoose.model('company',companyShema)

module.exports.Company = Company
module.exports.CompanySchema = companyShema