const { jwtVerify_member } = require( "../../jwt/jwt" );
const usersmodel = require( "../../models/usersmodel" );

// exports.members_details = async ( req, res ) =>
// {
//     try
//     {
//         const { email } = req.body;  // শুধুমাত্র email field নাও
//         const user = await usersmodel.findOne( { email } );
//         if ( !user )
//         {
//             return res.status( 404 ).json( { message: "User not found" } );
//         }

//         res.send( {
//             name: user.name,
//             Division: user.Division,
//             District: user.District,
//             upazila: user.upazila,
//             mobile: user.mobile,
//             email: user.email,
//             blood_group: user.blood_group,
//             last_donate_date: user.last_donate_date
//         } )


//     } catch ( err )
//     {
//         res.status( 500 ).json( { error: err.message } );
//     }
// };



exports.members_details = async ( req, res ) =>
{
    try
    {
        const { token } = req.body;  // frontend থেকে শুধু token আসবে

        if ( !token )
        {
            return res.status( 400 ).json( {
                success: false,
                message: "Token not provided"
            } );
        }

        // 🔹 Step 1: Token verify (helper ব্যবহার)
        const decoded = jwtVerify_member( token );
        if ( !decoded )
        {
            return res.status( 401 ).json( {
                success: false,
                message: "Invalid or expired token"
            } );
        }

        // 🔹 Step 2: email থেকে user বের করা
        const user = await usersmodel.findOne( { email: decoded.email } );
        if ( !user )
        {
            return res.status( 404 ).json( {
                success: false,
                message: "User not found"
            } );
        }

        // 🔹 Step 3: data পাঠানো
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
        console.error( "Error in members_details:", err.message );
        res.status( 500 ).json( {
            success: false,
            message: "Server error"
        } );
    }
};



exports.update_member = async (req, res) => {
    try {
        const { token, updates } = req.body;

        if (!token) {
            return res.status(400).json({ success: false, message: "Token not provided" });
        }

        // ✅ Step 1: Token verify
        const decoded = jwtVerify_member(token);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }

        // ✅ Step 2: User বের করা
        const email = decoded.email;
        const user = await usersmodel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // ✅ Step 3: Update করা
        Object.assign(user, updates); // যেই field পাঠানো হবে শুধু সেটাই change হবে
        await user.save();

        res.json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });

    } catch (err) {
        console.error("Error in update_member:", err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
