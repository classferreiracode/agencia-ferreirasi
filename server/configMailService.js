// server/configMailService.js
import nodemailer from 'nodemailer'

export function createTransporter() {
    return nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // STARTTLS
        auth: {
            user: process.env.MAIL_USER, // coloque no .env
            pass: process.env.MAIL_PASS,
        },
    })
}
