const { jwtVerify_member } = require( "../../../jwt/Member/jwt_member" );
const usersmodel = require( "../../../models/usersmodel" );


exports.update_member = async ( req, res ) =>
{
    try
    {
        const { token, updates } = req.body;

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

        // ✅ Step 3: Update করা
        Object.assign( user, updates ); // যেই field পাঠানো হবে শুধু সেটাই change হবে
        await user.save();

        res.json( {
            success: true,
            message: "Profile updated successfully",
            data: user
        } );

    } catch ( err )
    {
        console.error( "Error in update_member:", err.message );
        res.status( 500 ).json( { success: false, message: "Server error" } );
    }
};
