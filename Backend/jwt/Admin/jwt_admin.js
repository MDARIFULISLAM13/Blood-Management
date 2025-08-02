const jwt = require( 'jsonwebtoken' );



exports.jwtGen_admin = function ( email )
{

    return jwt.sign(
        { email: email },               // শুধু email payload
        process.env.JWT_SECRET_admin   // secret key

    );
};


exports.jwtVerify_admin = function ( token )
{
    try
    {
        return jwt.verify( token, process.env.JWT_SECRET_admin );
    } catch ( err )
    {
        return null;
    }
};
