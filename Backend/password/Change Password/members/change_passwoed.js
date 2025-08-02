

const { jwtVerify_member } = require( "../../../jwt/Member/jwt_member" );
const usersmodel = require( "../../../models/usersmodel" );

exports.change_password_member = async ( req, res ) =>
{
    try
    {
        const { token, old_password, new_password } = req.body;

        if ( !token )
        {
            return res.status( 400 ).json( { success: false, message: "Token not provided" } );
        }

        // ✅ Step 1: Token verify
        const decoded = jwtVerify_member( token );
        if ( !decoded )
        {
            return res.status( 401 ).json( { success: false, message: "Invalid or expired token" } );
        }

        // ✅ Step 2: User বের করা
        const email = decoded.email;
        const user = await usersmodel.findOne( { email } );

        if ( !user )
        {
            return res.status( 404 ).json( { success: false, message: "User not found" } );
        }

        if ( user.password != old_password )
        {
            console.log( password );
            // console.log( old_password );
            return res.status( 404 ).json( { success: false, message: "Old password does Not match" } );

        }
        // ✅ Step 3: Update করা
        user.password = new_password;
        await user.save();

        res.json( {
            success: true,
            message: "Password updated successfully",
        } );

    } catch ( err )
    {
        console.error( "Error in update_member:", err.message );
        res.status( 500 ).json( { success: false, message: "Server error" } );
    }
};
