//creando las librerias externas para cargar los modulos nesesarios para crear mi servidor estatico
var fs = require('fs'),
    config = require('../config/config.js'),
    mime = require('mime');
//exportar la funcion de servidor estatico serve hara la funcion de servir
//serve hara la funcion de servir
exports.serve = function name(url, res) {
    //acompletar al static 
    var filePath = config.STATIC_PATH + url;
    //   verificando si existe o no el archivo dentro del servidor "exist" me permite saber si existe la rurta o Node    
    fs.exists(filePath, function (exists) {
        if(exists){
            //sirvo el archivo
            fs.readFile(filePath, function (err, content) {
                if (err) {
                    console.log(`> hubo error en la lectura del archivo: ${filePath}`);
                    // enviar error 500 por error interno
                    res.writeHead(500,{
                        'ContentType' : 'text/html',
                        'Server' : 'Hawks-server@2.1.2*2'
                    });
                    //envia al usuario una respuesta del tipo de error 500
                    res.end("<h1> Error 500: Recurso dañado </h1>");
                } else {
                    //configuramos la respuesta con "mime.list"
                    var contentType = mime.lookup(filePath);
                    //armamos respuesta, los tipos de respuesta son contenttype y el server
                    res.writeHead(200,{
                        'Content-Type' : contentType,
                        'Server' : 'Hawks-server@2.1.2*2'
                    });
                    //enviar el archivo con el contenido
                    res.end(content);
                }
            });
        }else{
            //mando un codigo 404
            res.writeHead(404,{
                'ContentType' : 'text/html',
                'Server' : 'Hawks-server@2.1.2*2'
            });
            res.end("<h1> Error 404: Recurso no encontrado </h1>")
        }
    });
};