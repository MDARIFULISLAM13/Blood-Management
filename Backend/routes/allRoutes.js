const express = require( 'express' );
const { sing_up } = require( '../sign_up/signup' );
const { verifyOtp } = require( '../otp/otpverify' );
const { members_log_in } = require( '../log in/members/member_login' );
const { moderator_login } = require( '../log in/moderators/moderator_login' );
const { admin_login } = require( '../log in/Admin/admin_login' );
const { location_details } = require( '../location_data/location' );
const router = express.Router();


router.post( '/signup', sing_up );
router.post( '/verify', verifyOtp );
router.post( '/member/login', members_log_in );
router.post( '/moderator/login', moderator_login );
router.post( '/admin/login', admin_login );
router.get( '/location_data', location_details );

module.exports = router;
