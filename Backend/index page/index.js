const Users = require( "../models/usersmodel" );

exports.search_blood = async ( req, res ) =>
{
    try
    {
        const { blood_group, Division, District, upazila, neededDate } = req.body;

        const needed = new Date( neededDate );
        const minDonateDate = new Date( needed.setDate( needed.getDate() - 120 ) );

        const donors = await Users.find( {
            blood_group,
            last_donate_date: { $lte: minDonateDate }
        } );

        if ( !donors.length )
        {
            return res.json( [] );
        }

        const prioritized = donors.map( d =>
        {
            let priority = "Other Region";

            if ( d.Division === Division )
            {
                if ( d.District === District )
                {
                    if ( d.upazila === upazila )
                    {
                        priority = "Same Upazila";
                    } else
                    {
                        priority = "Same District";
                    }
                } else
                {
                    priority = "Same Division";
                }
            }

            return { ...d._doc, priority };
        } );

        res.json( prioritized );
    } catch ( err )
    {
        console.error( err );
        res.status( 500 ).json( { message: "Server error" } );
    }
};
