module.exports = function( dirname, extfilter, callback ) {
    
    var fs      = require( 'fs' ),
        path    = require( 'path' );
    fs.readdir( dirname, function ( err, list ) {
        if (err) return callback( err );    // early return
        // ... no error, continue doing stuff with the list of filepaths
        var targetExt = '.' + extfilter;
        var arr = list.filter( function(i) {
            return path.extname( i ) === targetExt;
        } );
        // success! call callback with no error
        return callback( null, arr );
    } );

}
