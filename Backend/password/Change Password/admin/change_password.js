

const { jwtVerify_admin } = require( "../../../jwt/Admin/jwt_admin" );
const usersmodel = require( "../../../models/usersmodel" );

exports.change_password_admin = async ( req, res ) =>
{
    try
    {
        const { token, old_password, new_password } = req.body;

        if ( !token )
        {
            return res.status( 400 ).json( { success: false, message: "Session Expired. Please log in again." } );
        }


        const decoded = jwtVerify_admin( token );
        if ( !decoded )
        {
            return res.status( 401 ).json( { success: false, message: "Session Expired. Please log in again." } );
        }


        const email = decoded.email;
        const user = await usersmodel.findOne( { email } );

        if ( !user )
        {
            return res.status( 404 ).json( { success: false, message: "User not found" } );
        }

        if ( user.password != old_password )
        {

            return res.status( 404 ).json( {
                success: false, message: "Old password is incorrect. Please try again."
            } );

        }

        user.password = new_password;
        await user.save();

        res.json( {
            success: true,
            message: "Password updated successfully",
        } );

    } catch ( err )
    {

        res.status( 500 ).json( { success: false, message: "Server error" } );
    }
};
