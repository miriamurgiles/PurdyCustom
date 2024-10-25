'use strict';

// Deps
var activity = require('./activity');

/*
 * GET home page.
 */
//console.log(req);
exports.index = function(req, res){
    if( !req.session.token ) {
        console.log("Prueba App");
        res.render( 'index', {
            title: 'Unauthenticated',
            errorMessage: 'This app may only be loaded via Salesforce Marketing Cloud',
        });
    } else {
        res.render( 'index', {
            title: 'Journey Builder Activity',
            results: activity.logExecuteData,
        });
    }
};

exports.login = function( req, res ) {
    console.log( 'req.body: ', req.body );
    res.redirect( '/' );
};

exports.logout = function( req, res ) {
    req.session.token = '';
};