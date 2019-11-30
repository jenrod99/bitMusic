'use strict';

var app = require('express');
var cancionController = require('../controllers/cancion');

var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/canciones'
});
var api = app.Router();
api.get('/canciones',
    cancionController.obtenerCanciones);
api.post('/cargar-fichero-cancion/:id',
    md_upload, cancionController.cargarFicheroCancion);
api.get('/obtener-fichero-cancion/:songFile',
    md_upload, cancionController.obtenerFicheroCancion);


api.post('/cancion', cancionController.crearCancion);
api.delete('/cancion/:id', cancionController.eliminarCancion);

module.exports = api;