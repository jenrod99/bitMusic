'use strict';

//trabajar con ficheros
var fs = require('fs');
var path = require('path');

var Usuario = require('../models/usuario');

function crearUsuario(req,res){
    var usuario = new Usuario();
    var params = req.body;

    usuario.nombre = params.nombre;
    usuario.edad = params.edad;
    usuario.role = "ROLE_USER"; 
    usuario.correo = params.correo;
    usuario.password = params.password;

    usuario.save((err,usuarioCreado)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!usuarioCreado){
                res.status(200).send({
                    message:"no se pudo crear el usuario"
                })
            }else{
                res.status(200).send({
                    usuario:usuarioCreado
                })
            }
        }
    })
}

function obtenerUsuario(req,res){
    var params = req.body;
    var correo = params.correo;
    var password = params.password;
    Usuario.findOne({correo:correo.toLowerCase()},
    (err,usuario)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!usuario){
                res.status(200).send({
                    message:"no existe usuario con el correo indicado"
                })
            }else{
                if(usuario.password != password){
                    res.status(200).send({
                      message:"contraseña errada"
                    })
                }else{
                    res.status(200).send({
                        usuario:usuario
                    })
                }
            }
        }
    })
}

function actualizarUsuario(req,res){
    var idUsuario = req.params.id;
    var usuarioActualizar = req.body;

    Usuario.findByIdAndUpdate(idUsuario,usuarioActualizar,(err,usuarioActualizado)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!usuarioActualizado){
                res.status(200).send({
                    message:"no se pudo actualizar el usuario"
                })
            }else{
                res.status(200).send({
                    usuario:usuarioActualizado
                })
            }
        }
    })

}

function eliminarUsuario(req,res){
    var idUsuario = req.params.id;
    
    Usuario.findByIdAndRemove(idUsuario,(err,usuarioEliminado)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!usuarioEliminado){
                res.status(200).send({
                    message:"no se pudo eliminar el usuario"
                })
            }else{
                res.status(200).send({
                    usuario:usuarioEliminado
                })
            }
        }
    })
}


function cargarImagenUsuario(req,res){
    var idUsuario = req.params.id;
    var file_name = 'No subido...';

    //se valida si viene el archivo con la variable superglobal files
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        //se obtiene nombre del archivo
        var file_name = file_split[2];

        //se obtiene extension fichero
        var exp_split = file_name.split('\.');
        var file_ext = exp_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            Usuario.findByIdAndUpdate(idUsuario,{imagen:file_name},(err,usuarioActualizado)=>{
                if(err){
                    res.status(500).send({message:'Error en el servidor'});
                }else{
                    if(!usuarioActualizado){
                        res.status(404).send({message:'No se ha podido actualizar el usuario'});
                    }else{
                        //devuelve usuario antes de actualizarse
                        usuarioActualizado.imagen = file_name;
                        res.status(200).send({usuario:usuarioActualizado});
                    }
                }
            });
        }else{
            res.status(200).send({message:"Extension del archivo no correcta"});    
        }
    }else{
        res.status(200).send({message:"no ha subido ninguna imagen"});
    }
}

function obtenerImagenUsuario(req,res){
        //nombre fichero
        var imageFile = req.params.imageFile;
        //ruta archivo 
        var path_file = './uploads/usuario/'+imageFile;
        //se comprueba si existe
        fs.exists(path_file,function(exists){
            if(exists){
                //devolvemos la imagen
                res.sendFile(path.resolve(path_file));
            }else{
                res.status(200).send(
                    {message:"no existe imagen"});
            }
        });
}

module.exports = {
    crearUsuario,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario,
    cargarImagenUsuario,
    obtenerImagenUsuario
};