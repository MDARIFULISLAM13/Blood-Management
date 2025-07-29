

const mongo = require( 'mongoose' );

const  Users_Schema = mongo.Schema( {

    name: {
        type: String,
        required: true
    },
    Division: {
        type: String,
        required: true

    },
    District: {
        type: String,
        required: true
    },
    upazila: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    blood_group: {

        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    last_donate_date: {
        type: Date,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    moderator: {
        type: Boolean,
        default: false
    },
    otp: String,
    otpExpires: Date

} )

module.exports = mongo.model( 'Users', Users_Schema );