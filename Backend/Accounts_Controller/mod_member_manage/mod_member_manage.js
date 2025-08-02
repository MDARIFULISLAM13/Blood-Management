const usersmodel = require( "../../models/usersmodel" );



exports.mod_member_manage = async ( req, res ) =>
{

    try
    {
        const { mobile } = req.body;

        const user = await usersmodel.findOne( { mobile } );

        if ( !user )
        {
            return res.status( 404 ).json( { success: false, message: "User not found" } );
        }

        res.json( {
            success: true,
            data: {
                name: user.name,
                Division: user.Division,
                District: user.District,
                upazila: user.upazila,
                mobile: user.mobile,
                blood_group: user.blood_group,
                last_donate_date: user.last_donate_date
            }
        } );
    }
    catch ( err )
    {
        console.error( "Error in members_details:", err.message );
        res.status( 500 ).json( {
            success: false,
            message: "Server error"
        } );
    }

}

exports.update_last_donate_date = async ( req, res ) =>
{
    try
    {
        const { mobile, last_donate_date } = req.body;
        const user = await usersmodel.findOne( { mobile } );

        if ( !user )
        {
            return res.status( 404 ).json( { success: false, message: "User not found" } );
        }

        user.last_donate_date = last_donate_date;
        await user.save();   // DB তে save করলেই update হবে

        res.json( {
            success: true,
            message: "Update Done",
            data: {
                mobile: user.mobile,
                last_donate_date: user.last_donate_date
            }
        } );
    } catch ( err )
    {
        console.error( "Error in update_last_donate_date:", err.message );
        res.status( 500 ).json( {
            success: false,
            message: "Server error"
        } );
    }
};
