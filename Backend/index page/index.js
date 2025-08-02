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

        const prioritized = [];

        // 1. same upazila
        donors
            .filter( d => d.Division === Division && d.District === District && d.upazila === upazila )
            .forEach( d => prioritized.push( { ...d._doc, priority: "Same Upazila" } ) );

        // 2. same district
        donors
            .filter( d => d.Division === Division && d.District === District && d.upazila !== upazila )
            .forEach( d => prioritized.push( { ...d._doc, priority: "Same District" } ) );

        // 3. same division
        donors
            .filter( d => d.Division === Division && d.District !== District )
            .forEach( d => prioritized.push( { ...d._doc, priority: "Same Division" } ) );

        // 4. others
        donors
            .filter( d => d.Division !== Division )
            .forEach( d => prioritized.push( { ...d._doc, priority: "Other Region" } ) );

        res.json( prioritized );
    } catch ( err )
    {
        console.error( err );
        res.status( 500 ).json( { message: "Server error" } );
    }
};