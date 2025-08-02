
const { jwtVerify_admin } = require( "../../../jwt/Admin/jwt_admin" );

const usersmodel = require( "../../../models/usersmodel" );

exports.update_admin = async ( req, res ) =>
{
    try
    {
        const { token, updates } = req.body;

        if ( !token )
        {
            return res.status( 400 ).json( { success: false, message: "Session Expired. Please log in again" } );
        }


        const decoded = jwtVerify_admin( token );
        if ( !decoded )
        {
            return res.status( 401 ).json( { success: false, message: " Session Expired. Please log in again." } );
        }


        const email = decoded.email;
        const user = await usersmodel.findOne( { email } );

        if ( !user )
        {
            return res.status( 404 ).json( { success: false, message: "User not found" } );
        }

        Object.assign( user, updates );
        await user.save();

        res.json( {
            success: true,
            message: "Profile updated successfully",
            data: user
        } );

    } catch ( err )
    {
      
        res.status( 500 ).json( { success: false, message: "Server error" } );
    }
};
