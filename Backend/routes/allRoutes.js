


const express = require( 'express' );
const { sign_up } = require( '../sign_up/signup' );
const { verifyOtp } = require( '../otp/otpverify' );
const { members_log_in } = require( '../log in/members/member_login' );
const { location_details } = require( '../location_data/location' );
const { members_details } = require( '../Accounts_Controller/Accounts/members/members_account' );
const { jwtVerify_member, jwtGen_member } = require( '../jwt/Member/jwt_member' );
const { update_member } = require( '../Accounts_Controller/Update Account/Members/update_member_info' );
const { change_password } = require( '../password/Change Password/change_passwoed' );

const router = express.Router();




router.post( '/signup', sign_up );
router.post( '/verify', verifyOtp );
router.post( '/member/login', members_log_in );
router.get( '/location_data', location_details );
router.post( '/member_details', members_details );
router.post( '/jwtVerify_member', jwtVerify_member );
router.post( '/jwtgen_member', jwtGen_member );
router.post( '/update_member', update_member );
router.post( '/change_password', change_password );




module.exports = router;
