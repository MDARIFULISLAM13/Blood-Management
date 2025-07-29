const jwt = require( 'jsonwebtoken' );

exports.jwtGen_member = function ( userId, username )
{
    return jwt.sign(
        { id: userId, username: username },
        process.env.JWT_SECRET_member
    );
};

exports.jwtVerify_member = function ( token )
{
    try
    {
        const decoded = jwt.verify( token, process.env.JWT_SECRET_member );
        return decoded;  // Valid হলে ডিকোডেড ডাটা রিটার্ন করবে
    } catch ( err )
    {
        return null;     // Invalid বা expired হলে null রিটার্ন করবে
    }
};

exports.jwtGen_moderator = function ( userId, username )
{
    return jwt.sign(
        { id: userId, username: username },
        process.env.JWT_SECRET_mod
    );
};

exports.jwtVerify_moderators = function ( token )
{
    try
    {
        const decoded = jwt.verify( token, process.env.JWT_SECRET_mod );
        return decoded;  // Valid হলে ডিকোডেড ডাটা রিটার্ন করবে
    } catch ( err )
    {
        return null;     // Invalid বা expired হলে null রিটার্ন করবে
    }
};


exports.jwtGen_admin = function ( userId, username )
{
    return jwt.sign(
        { id: userId, username: username },
        process.env.JWT_SECRET_admin
    );
};

exports.jwtVerify_admin = function ( token )
{
    try
    {
        const decoded = jwt.verify( token, process.env.JWT_SECRET_admin );
        return decoded;  // Valid হলে ডিকোডেড ডাটা রিটার্ন করবে
    } catch ( err )
    {
        return null;     // Invalid বা expired হলে null রিটার্ন করবে
    }
};

