const jwt = require( 'jsonwebtoken' );



exports.jwtGen_admin = function ( email )
{

    return jwt.sign(
        { email: email },
        process.env.JWT_SECRET_admin   

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
