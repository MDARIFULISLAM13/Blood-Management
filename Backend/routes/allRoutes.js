


const express = require( 'express' );
const { sign_up } = require( '../sign_up/signup' );
const { verifyOtp } = require( '../otp/otpverify' );
const { members_log_in } = require( '../log in/members/member_login' );
const { location_details } = require( '../location_data/location' );
const { members_details } = require( '../Accounts_Controller/Accounts/members/members_account' );
const { jwtVerify_member, jwtGen_member } = require( '../jwt/Member/jwt_member' );
const { update_member } = require( '../Accounts_Controller/Update Account/Members/update_member_info' );
const { moderator_login } = require( '../log in/moderators/moderator_login' );
const { moderator_details } = require( '../Accounts_Controller/Accounts/moderators/moderators_account' );
const { update_moderator } = require( '../Accounts_Controller/Update Account/moderators/update_moderator_info' );
const { change_password_member } = require( '../password/Change Password/members/change_passwoed' );
const { change_password_moderator } = require( '../password/Change Password/moderator/change_password' );
const { mod_member_manage, update_last_donate_date } = require( '../Accounts_Controller/mod_member_manage/mod_member_manage' );
const { admin_login } = require( '../log in/Admin/admin_login' );
const { admin_details } = require( '../Accounts_Controller/Accounts/admin/admin_account' );
const { change_password_admin } = require( '../password/Change Password/admin/change_password' );
const { update_admin } = require( '../Accounts_Controller/Update Account/Admin/update_admin' );
const { get_moderators, add_moderator, remove_moderator } = require( '../Accounts_Controller/moderator Manage/admin' );
const { search_blood } = require( '../index page' );
const { reset_password, setNewPassword } = require( '../password/Reset Password/reset' );

const router = express.Router();



router.post( '/signup', sign_up );
router.post( '/verify', verifyOtp );
router.post( '/member/login', members_log_in );
router.get( '/location_data', location_details );
router.post( '/member_details', members_details );
router.post( '/jwtVerify_member', jwtVerify_member );
router.post( '/jwtgen_member', jwtGen_member );
router.post( '/update_member', update_member );
router.post( '/change_password_member', change_password_member );
router.post( '/moderator/login', moderator_login );
router.post( '/moderator_details', moderator_details );
router.post( '/update_moderator', update_moderator );
router.post( '/change_password_moderator', change_password_moderator );
router.post( '/mod_member_manage', mod_member_manage );
router.post( '/update_last_donate_date', update_last_donate_date );
router.post( '/admin/login', admin_login );
router.post( '/admin_details', admin_details );
router.post( '/change_password_admin', change_password_admin );
router.post( '/update_admin', update_admin );
router.post( '/get_moderators', get_moderators );
router.post( '/add_moderator', add_moderator );
router.post( '/remove_moderator', remove_moderator );
router.post( '/search_blood', search_blood );
router.post( '/reset_password', reset_password );
router.post( '/setNewPassword', setNewPassword );
module.exports = router;
