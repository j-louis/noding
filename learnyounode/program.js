// Exercise One
//console.log( 'HELLO WORLD' );

/*
// Exercise Two
var sum = 0;
for ( var idx=2; idx<(process.argv.length); idx++ ){
    sum += +process.argv[idx];
}
console.log( sum );
*/

// Exercise Three
/*
var fs          = require('fs'),
    path        = require( 'path' )
    fileName    = 'text.txt';
//var buf = fs.readFileSync( path.join( path.dirname( process.argv[1] ), fileName ) );
var buf = fs.readFileSync( process.argv[2] );
var lines = buf.toString().split( '\n' );
console.log( lines.length - 1 );
*/

// Exercise Four
/*
var fs = require('fs');
fs.readFile( process.argv[2], function ( err, buf ) {
    if (err) throw err;
    var lines = buf.toString().split( '\n' );
    console.log( lines.length - 1 );
} );
*/

// Exercise Five
/*
var fs      = require('fs'),
    path    = require( 'path' );
fs.readdir( process.argv[2], function ( err, list ) {
    if (err) throw err;
    var targetExt = '.' + process.argv[3];
    var arr = list.filter( function(i) { 
        return path.extname( i ) === targetExt;
    } );
    arr.forEach( function(i) { console.log( i ) } );
} );
*/

// Exercise Six
/*
var path        = require( 'path' ),
    mymodule    = require( './my_module.js' );
mymodule( process.argv[2], process.argv[3], function( err, data ) {
    if (err) console.log( err );
    data.forEach( function(f) { console.log( f ) } );
} )
*/

// Exercise Seven
/*
var http = require( 'http' );
http.get( process.argv[2], function( response ) {
    // change it so that the standard Node Buffer objects are now strings
    response.setEncoding( 'utf8' );
    // continue on to manipulate the response object
    response.on( 'data', console.log );
    response.on( 'error', console.error );
} )
*/

// Exercise Eight
/*
var http = require( 'http' );
http.get( process.argv[2], function( response ) {
    // create container for all data to be collected
    var datas = [];
    // change it so that the standard Node Buffer objects are now strings
    response.setEncoding( 'utf8' );
    // continue on to manipulate the response object
    response.on( 'data', function( data ) {
        datas.push( data );
    } );
    response.on( 'error', console.error );
    response.on( 'end', function() {
        var charCount = 0;
        var allChars = '';
        datas.forEach( function( f ) { 
            charCount += f.length;
            allChars += f;
        } );
        console.log( charCount + '\n' + allChars );
    } );
} );
*/

// Exercise Nine
/*
var http = require( 'http' );
var urls = process.argv.slice(2);
var urlCnt = 0;
// define container for putting data in
var datasAll = [];
function getAllUrlData( url ) {
    http.get( url, function( response ) {
        // define container for putting data in
        var datas = [];
        // convert buffer objects to strings
        response.setEncoding( 'utf8' );
        // continuing on messing with the response object
        response.on( 'data', function( data ) {
            datas.push( data );
        } );
        response.on( 'error', console.error );
        response.on( 'end', function() {
            // increase counter keeping track of number of returns
            urlCnt ++;
            datasAll[urls.indexOf( url ) ] = datas.join('');
            if ( urlCnt == datasAll.length ) {
                datasAll.forEach( function( f ) {
                    console.log( f.toString() );
                } );
            }
        } );
    } );
}
urls.forEach( getAllUrlData );
*/

// Exercise Ten
/*
var net = require( 'net' );
// create raw TCP server
var server = net.createServer( function( socket ) {
    var dte = new Date();
    // write date and time to Node duplexx Stream
    socket.write( dte.getFullYear() + '-' + 
                  ( '0' + ( dte.getMonth() + 1 ) ).slice(-2) + '-' + 
                  ( '0' + dte.getDate() ).slice(-2) + ' ' + 
                  ( '0' + dte.getHours() ).slice(-2)+ ':' + 
                  ( '0' + dte.getMinutes() ).slice(-2) );
    // close the socket
    socket.end( '\n' );
} );
// start listening on the given port number
server.listen( process.argv[2] );
*/

// Exercise Eleven
/*
var http = require( 'http' );
var fs = require( 'fs' );
// create http server
var server = http.createServer( function( req, res ) {
    // create a stream representing the file
    var src = fs.createReadStream( process.argv[3] );
    // pipe data from source (file) to dst (http response stream)
    src.pipe( res );
} );
// start server listening on given port number
server.listen( process.argv[2] );
*/

// Exercise Twelve
/*
var streammap = require( 'through2-map' );
var http = require( 'http' );
var server = http.createServer( function( req, res ) {
    req.pipe( streammap( function( chunk ) {
        return chunk.toString().toUpperCase();
    } ) ).pipe( res );
} );
// begin listening on given port number
server.listen( process.argv[2] );
*/

// Exercise Thirteen
/*
var http = require( 'http' );
var url = require( 'url' );
function endPtOne( dteObj) {
    var jsnObj = {};
    jsnObj.hour = dteObj.getHours();
    jsnObj.minute = dteObj.getMinutes();
    jsnObj.second = dteObj.getSeconds();
    // var jsnObj = {
    //     'hour': dteObj.getHours(),
    //     'minute': dteObj.getMinutes(),
    //     'second': dteObj.getSeconds()
    // };
    return jsnObj;
}
function endPtTwo( dteObj) {
    var jsnObj = {};
    // jsnObj.unixtime = dteObj.getTime();
    // var jsnObj = {
    //     'unixtime': dteObj.getTime();
    // };
    return jsnObj;
}
var server = http.createServer( function( req, res ) {
    // get object from parsing url and query string
    var parsedUrl = url.parse( req.url, true );
    // set the Content-Type property (not wholey necessary)
    res.writeHead( 200, 
                   { 'Content-Type': 'application/json' } );
    // create json object from date components
    var dte = new Date( parsedUrl.query.iso )
    var jsnRes = {};
    if ( parsedUrl.pathname === '/api/parsetime' ) {
        var jsnRes = endPtOne( dte );
    } else if ( parsedUrl.pathname === '/api/unixtime' ) {
        var jsnRes = endPtTwo( dte );
    } else {
        console.error( 'unknown pathname...what should i do here?!' );
    }
    // send json data to resonse
    res.write( JSON.stringify( jsnRes ) );
    // i believe we are done here
    res.end();
} );
// begin listeing on the given port number
server.listen( process.argv[2] );
*/