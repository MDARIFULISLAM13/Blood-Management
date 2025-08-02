const Users = require( "../../models/usersmodel" );


exports.get_moderators = async ( req, res ) =>
{
    try
    {
        const moderators = await Users.find(
            { moderator: true },
            { name: 1, mobile: 1, Division: 1, District: 1, upazila: 1, last_donate_date: 1, _id: 0 }
        );
        res.status( 200 ).json( moderators );
    } catch ( err )
    {
        console.error( err );
        res.status( 500 ).json( { message: "Server error" } );
    }
};

exports.add_moderator = async ( req, res ) =>
{
    try
    {
        const { mobile } = req.body;
        const user = await Users.findOne( { mobile } );

        if ( !user )
        {
            return res.status( 404 ).json( { message: "User not found" } );
        }

        user.moderator = true;
        await user.save();

        res.json( { message: "Moderator added successfully" } );
    } catch ( err )
    {
        console.error( err );
        res.status( 500 ).json( { message: "Server error" } );
    }
};


exports.remove_moderator = async ( req, res ) =>
{
    try
    {
        const { mobile } = req.body;
        const user = await Users.findOne( { mobile } );

        if ( !user )
        {
            return res.status( 404 ).json( { message: "User not found" } );
        }

        if ( !user.moderator )
        {
            return res.status( 400 ).json( { message: "User is not a moderator" } );
        }

        user.moderator = false;
        await user.save();

        res.json( { message: "Moderator removed successfully" } );
    } catch ( err )
    {
        console.error( err );
        res.status( 500 ).json( { message: "Server error" } );
    }
};
