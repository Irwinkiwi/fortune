// http
 var http = require("http"),
 	fs = require('fs'),
 	config = require("./config/config.js"),
 	staticServer = require('./internals/static-server'),
 	colors = require("colors"),
     handlers = require('./internals/handlers');
 // Obteniendo las configuraciones
 // del modulo de configuracion
 var PORT = config.PORT;
 var IP = config.IP;
 if(IP == '127.0.0.1'){
      console.log("> ---- EJECUTANDO EN MODO LOCAL ----");
 }
 // Crea  un  servidor basico
 var server = http.createServer(function (req, res) {
     // obtener la url del archivo 
    // de la peticion le asigno una variable url
    var url = req.url;
    if(url == "/"){
        // Sirve el index
        url = "/index.html";
    }
    // Verificando que la peticion
    // del cliente sea una ruta
    // virtual
    if(typeof(handlers[url]) === 'function'){
        // Si entro aqui, significa que
        // existe un manejador para la url
        // que se esta solicitando por lo tanto
        // la ejecuto
        handlers[url](req, res)
    }else{
        console.log(`> URL Solicitada: ${url} ...`.yellow);
        // sirvo la url con mi server statico
        staticServer.serve(url, res);
    }   
});
// Poner a trabjar al server
server.listen(PORT,IP,function(){
    console.log(`> Server listening @http://${IP}:${PORT} ...`);
});