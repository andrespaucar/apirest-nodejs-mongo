const mongoose = require('mongoose')
const morgan = require('morgan')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const car = require('./routes/car')
const user = require('./routes/user')
const company = require('./routes/company')
const sale = require('./routes/sale')
const auth = require('./routes/auth')
app.use(express.json())

app.use('/api/cars/', car)
app.use('/api/users/', user)
app.use('/api/company/', company)
app.use('/api/sale/', sale)
app.use('/api/auth/', auth)


morgan('tiny')
app.listen(port, () => console.log('Escuchando en el puerto ' + port))

mongoose.connect('mongodb://localhost/carsdb',{useNewUrlParser : true, useFindAndModify:true,useUnifiedTopology:true, useCreateIndex:true})
    .then(() => console.log('Conectado a Mongo DB sin problemas'))
    .catch(()=> console.log('No se pudo conectar mongodb'))