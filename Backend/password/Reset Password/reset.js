const User = require( "../../models/usersmodel" );
const { sendOTP } = require( "../../otp/otpsend" );


exports.reset_password = async ( req, res ) =>
{
    try
    {
        const { email } = req.body;
        const user = await User.findOne( { email } );
        if ( !user )
        {
            return res.status( 404 ).json( { status: false, msg: "User Not Found" } );
        }

        // Generate OTP
        let base = Math.floor( 100000 + Math.random() * 900000 ).toString();
        let seconds = new Date().getSeconds().toString();
        let otp = ( base + seconds ).slice( 0, 6 );

        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        await sendOTP( email, user.name, otp );

        res.json( { status: true, msg: "OTP sent to email", email: user.email } );

    } catch ( err )
    {
        console.error( err );
        res.status( 500 ).json( { status: false, msg: "Server error" } );
    }
};


exports.setNewPassword = async ( req, res ) =>
{
    try
    {
        const { email, newPassword } = req.body;

        const user = await User.findOne( { email } );
        if ( !user ) return res.status( 400 ).json( { message: "User not found" } );


        user.password =newPassword;

        user.otp = null;
        user.otpExpires = null;
        user.isVerified = true;

        await user.save();

        res.json( { message: "Password reset successful !" } );
    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).json( { message: "Server error" } );
    }
};
