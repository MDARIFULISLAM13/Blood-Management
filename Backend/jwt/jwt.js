const jwt = require( 'jsonwebtoken' );

exports.jwtGen = function ( userId, username )
{
    return jwt.sign(
        { id: userId, username: username },
        process.env.JWT_SECRET
    );
};

exports.jwtVerify = function ( token )
{
    try
    {
        const decoded = jwt.verify( token, process.env.JWT_SECRET );
        return decoded;  // Valid হলে ডিকোডেড ডাটা রিটার্ন করবে
    } catch ( err )
    {
        return null;     // Invalid বা expired হলে null রিটার্ন করবে
    }
};
