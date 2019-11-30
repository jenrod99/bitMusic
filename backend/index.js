'use strict'

var mongoose = require('mongoose')
var app = require('./app')
var puerto = 3977;

mongoose.connect("mongodb://localhost:27017/musicbit",(err,res)=>{
    if(err){
        throw err;
    }else{
        console.log("conexion exitosa a bd musicbit");
        app.listen(puerto,()=>{
            console.log("servidor escuchando en el puerto "+puerto)
        })
    }
})