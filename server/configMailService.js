// server/configMailService.js
import nodemailer from 'nodemailer'

export function createTransporter() {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // STARTTLS
        auth: {
            user: process.env.MAIL_USER, // coloque no .env
            pass: process.env.MAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    })
}
