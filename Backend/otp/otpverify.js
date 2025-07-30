const User = require( "../models/usersmodel" );


exports.verifyOtp = async ( req, res ) =>
{


    try
    {
        const { email, otp } = req.body;


        const user = await User.findOne( { email } );
        if ( !user ) return res.status( 400 ).json( { message: 'User not found' } );
        if ( user.otp !== otp ) return res.status( 400 ).json( { message: 'Invalid OTP' } );
        if ( user.otpExpires < Date.now() ) return res.status( 400 ).json( { message: 'OTP expired' } );

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.json( { message: 'Email verified successfully!' } );
    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).json( { message: 'Server error' } );
    }
};