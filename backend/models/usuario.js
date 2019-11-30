'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String,
    edad: Number,
    correo: String,
    password: String,
    imagen:String,
    role:String
})

module.exports = mongoose.model('usuario',usuarioSchema);