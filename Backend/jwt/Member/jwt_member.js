const jwt = require( 'jsonwebtoken' );



exports.jwtGen_member = function ( email )
{

    return jwt.sign(
        { email: email },
        process.env.JWT_SECRET_member   

    );
};


exports.jwtVerify_member = function ( token )
{
    try
    {
        return jwt.verify( token, process.env.JWT_SECRET_member );
    } catch ( err )
    {
        return null;
    }
};
