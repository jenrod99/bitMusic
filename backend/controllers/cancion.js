'use strict';

//trabajar con ficheros
var fs = require('fs');
var path = require('path');

var Cancion = require('../models/cancion')

function crearCancion(req,res){
    var cancion = new Cancion();
    var params = req.body;

    cancion.titulo = params.titulo;
    cancion.duracion = params.duracion;
    cancion.genero = params.genero;
    cancion.artista = params.artista;

    cancion.save((err,cancionCreada)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!cancionCreada){
                res.status(200).send({
                    message:"no se pudo crear la cancion"
                })
            }else{
                res.status(200).send({
                    cancion:cancionCreada
                })
            }
        }
    })
}

function eliminarCancion(req,res){
    var idCancion = req.params.id;

    Cancion.findByIdAndRemove(idCancion,(err,cancionEliminada)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!cancionEliminada){
                res.status(200).send({
                    message:"no se pudo eliminar la cancion"
                })
            }else{
                res.status(200).send({
                    cancion:cancionEliminada
                })
            }
        }
    })
}

function obtenerCanciones(req,res){
    Cancion.find((err,canciones)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!canciones){
                res.status(200).send({
                    message:"no se pudo obtener las canciones"
                })
            }else{
                res.status(200).send({
                    canciones:canciones
                })
            }
        }
    })
}

function cargarFicheroCancion(req,res){
    var idCancion = req.params.id;
    var file_name = 'No subido...';

    //se valida si viene el archivo con la variable superglobal files
    if(req.files){
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\');
        //se obtiene nombre del archivo
        var file_name = file_split[2];

        //se obtiene extension fichero
        var exp_split = file_name.split('\.');
        var file_ext = exp_split[1];

        if(file_ext == 'mp3'){
            Cancion.findByIdAndUpdate(idCancion,{archivo:file_name},(err,cancionActualizada)=>{
                if(err){
                    res.status(500).send({message:'Error en el servidor'});
                }else{
                    if(!cancionActualizada){
                        res.status(404).send({message:'No se ha podido actualizar la cancion'});
                    }else{
                        //devuelve usuario antes de actualizarse
                        res.status(200).send({cancion:cancionActualizada});
                    }
                }
            });
        }else{
            res.status(200).send({message:"Extension del archivo no correcta"});    
        }
    }else{
        res.status(200).send({message:"no ha subido ninguna cancion"});
    }
}

function obtenerFicheroCancion(req,res){
    //nombre fichero
    var songFile = req.params.songFile;
    //ruta archivo 
    var path_file = './uploads/canciones/'+songFile;
    
    //se comprueba si existe
    fs.exists(path_file,function(exists){
        if(exists){
            //devolvemos la imagen
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:"no existe el fichero de audio"});
        }
    });
}

function obtenerTodasCanciones(req,res){

    Cancion.find().exec()
    .then((canciones)=>{
        if (!canciones) {
            res.status(404).send({ message: "Las canciones no se ha cargado" });
        } else {
            res.status(200).send({canciones: canciones});
        }
    }).catch(error =>{
        res.status(500).send({ message: "Error al cargar las canciones" });
    })
}


module.exports = {
    crearCancion,
    eliminarCancion,
    obtenerCanciones,
    cargarFicheroCancion,
    obtenerFicheroCancion,
    obtenerTodasCanciones
};