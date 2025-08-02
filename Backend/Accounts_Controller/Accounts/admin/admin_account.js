
const { jwtVerify_admin } = require( "../../../jwt/Admin/jwt_admin" );
const usersmodel = require( "../../../models/usersmodel" );


exports.admin_details = async ( req, res ) =>
{


    try
    {
        const { token } = req.body;

        if ( !token )
        {
            return res.status( 400 ).json( {
                success: false,
                message: "Session Expired. Please log in again."
            } );
        }


        const decoded =jwtVerify_admin( token );
        if ( !decoded )
        {
            return res.status( 401 ).json( {
                success: false,
                message: "Session Expired. Please log in again."
            } );
        }

        const user = await usersmodel.findOne( { email: decoded.email } );

        if ( !user )
        {
            return res.status( 404 ).json( {
                success: false,
                message: "User not found"
            } );
        }

        res.json( {
            success: true,
            data: {
                name: user.name,
                Division: user.Division,
                District: user.District,
                upazila: user.upazila,
                mobile: user.mobile,
                email: user.email,
                blood_group: user.blood_group,
                last_donate_date: user.last_donate_date
            }
        } );
    } catch ( err )
    {

        res.status( 500 ).json( {
            success: false,
            message: "Server error"
        } );
    }
};