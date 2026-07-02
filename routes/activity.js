'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    //res.send(200, 'Edit');
    res.status(200).send('Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    //res.send(200, 'Save');
    res.status(200).send('Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {

    // === INICIO DEL CAMBIO ===
    // Si Heroku recibe los datos como Buffer, los convertimos a String.
    // Si Azure los recibe directamente como String, se mantienen igual.
    let jwtBody = req.body;

    // Forzar conversión si Express/Heroku lo parsearon como un objeto Buffer serializado o nativo
    if (req.body && req.body.type === 'Buffer' && Array.isArray(req.body.data)) {
        jwtBody = Buffer.from(req.body.data).toString('utf8');
    } else if (Buffer.isBuffer(req.body)) {
        jwtBody = req.body.toString('utf8');
    }
    // === FIN DEL BLOQUE ===

    // example on how to decode JWT
    
    //CAMBIO JCA
    JWT(jwtBody, process.env.jwtSecret, (err, decoded) => {
    /*
    JWT(req.body, process.env.jwtSecret, (err, decoded) => {
    */
        // verification error -> unauthorized request
        if (err) {
            //log
            console.error('================ JWT ERROR ================');
            console.error('Error JWT:', err.message || err);
            console.error('Existe jwtSecret:', !!process.env.jwtSecret);
            console.error('jwtSecret length:', process.env.jwtSecret ? process.env.jwtSecret.length : 0);
            // CAMBIO AQUÍ: Imprimir el string procesado para auditar la cadena exacta en Heroku
            console.error('Texto JWT procesado:', jwtBody); 
            console.error('===========================================');
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
           
            // decoded in arguments
            var decodedArgs = decoded.inArguments[0];
            console.log(decodedArgs);

            //log
            console.log('================ EXECUTE CUSTOM ACTIVITY ================');
            console.log('decodedArgs:', JSON.stringify(decodedArgs, null, 2));
            console.log('templateId:', decodedArgs.templateId);
            console.log('phoneNumber:', decodedArgs.phoneNumber);
            console.log('clientName:', decodedArgs.clientName);
            console.log('useBotWebhook:', decodedArgs.useBotWebhook);
            console.log('=========================================================');
            const axios = require('axios');
            
            let config;

            if (decodedArgs.useBotWebhook === true) {
                console.log('>>> Entró al flujo BOT WEBHOOK');
                let botData = {
                    "first_name": decodedArgs.clientName,
                    "phone": decodedArgs.phoneNumber
                };

                //log
                console.log('Payload BOT:', JSON.stringify(botData, null, 2));

                config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://us-central1-atomchat-io.cloudfunctions.net/webhook/33e-f6f-421-8d2-81b',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer d9fc86bc-aaeb-168e-243f-578de7e5835c'
                    },
                    data: botData
                };

            } else {
                let data = {
                    "templateId": decodedArgs.templateId,
                    "phoneNumber": decodedArgs.phoneNumber,
                    "clientName": decodedArgs.clientName,
                    "groupName": "Purdy Citas",
                    "assign": false,
                    "params": {
                        "client_name": decodedArgs.clientName
                    }
                };

                if (decodedArgs.Enlace) {
                    data.params.Enlace = decodedArgs.Enlace;
                }

                config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://us-central1-atomchat-io.cloudfunctions.net/templates',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 5b12b8d9-20b1-1b49-762d-5ca346e02445'
                    },
                    data: data
                };
            }

            //log
            console.log('URL destino:', config.url);
            console.log('Headers:', JSON.stringify(config.headers, null, 2));
            console.log('Payload final:', JSON.stringify(config.data, null, 2));
           
            axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);

               //log 
              if (error.response) {
                    console.error('Status:', error.response.status);
                    console.error('Data:', JSON.stringify(error.response.data));
                } else {
                    console.error(error.message);
                }  


            });
            logData(req);
            //res.send(200, 'Execute');
            res.status(200).send('Execute');
        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });
};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);

    //res.send(200, 'Publish');
    res.status(200).send('Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    
    //res.send(200, 'Validate');
    res.status(200).send('Validate');
};