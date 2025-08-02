const nodemailer = require( 'nodemailer' );
const express = require( 'express' );
require( 'dotenv' ).config();

exports.sendOTP = async ( email,name, otp ) =>
{
    const transporter = nodemailer.createTransport( {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    } );

    const mailOptions = {
        from: `"ROKTODAAN" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'ROKTODAAN - OTP Verification',
        text: `Dear ${name},.\n\nYour One-Time Password (OTP) is: ${otp}\n\nNote: This OTP will expire in 10 minutes. Please do not share this code with anyone.\n\nBest regards,\nROKTODAAN Team`
    };



    return transporter.sendMail( mailOptions );
};
