
const path = require( 'path' );
exports.location_details= ( req, res ) =>
{
  
    res.sendFile( path.join( __dirname, 'data.json' ) );

};
