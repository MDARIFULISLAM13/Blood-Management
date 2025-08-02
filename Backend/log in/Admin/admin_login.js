



const { jwtGen_admin } = require( "../../jwt/Admin/jwt_admin" );
const User = require( "../../models/usersmodel" );


exports.admin_login = async ( req, res ) =>
{
    let { details, password } = req.body;

    let num = true;

    for ( let i = 0; i < details.length; i++ )
    {
        if ( details[i] < '0' || details[i] > '9' )
        {
            num = false;
            break;
        }
    }


    if ( num )
    {
        try
        {
            const mobile = details;
            const user = await User.findOne( { mobile } );
            if ( !user ) return res.status( 401 ).json( { message: 'User Not Found' } );
            if ( !user.isVerified ) return res.status( 401 ).json( { message: 'Please verify your email first' } );
            if ( user.password !== password ) return res.status( 401 ).json( { message: 'Invalid username or password.' } );
            if ( !user.admin ) return res.status( 401 ).json( { message: 'Access denied: You are not an admin' } );

            const token = jwtGen_admin( user.email );
            return res.json( { token } );


        } catch ( error )
        {
            console.error( error );
            res.status( 500 ).json( { message: 'Server error' } );
        }

    } else
    {
        try
        {
            const email = details;
            const user = await User.findOne( { email } );
            if ( !user ) return res.status( 401 ).json( { message: 'User Not Found' } );
            if ( !user.isVerified ) return res.status( 401 ).json( { message: 'Please verify your email first' } );
            if ( user.password !== password ) return res.status( 401 ).json( { message: 'Invalid username or password.' } );
            if ( !user.admin ) return res.status( 401 ).json( { message: 'Access denied: You are not an admin' } );
            const token = jwtGen_admin( user.email );
            return res.json( { token } );


        } catch ( error )
        {
            console.error( error );
            res.status( 500 ).json( { message: 'Server error' } );
        }

    }
}


