const jwt = require( 'jsonwebtoken' );



exports.jwtGen_moderator = function ( email )
{

    return jwt.sign(
        { email: email },               // শুধু email payload
        process.env.JWT_SECRET_moderator   // secret key

    );
};

exports.jwtVerify_moderator = function ( token )
{
    try
    {
        return jwt.verify( token, process.env.JWT_SECRET_moderator );
    } catch ( err )
    {
        return null;
    }
};
