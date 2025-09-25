import nodeMailer from 'nodemailer'

// Cria um transporter para o envio de emails
function createTransporter() {
    return nodeMailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ferreirasi.tk@outlook.com',
            pass: '*11*Web*',
        },
        tls: {
            rejectUnauthorized: false,
        },
    })
}

export { createTransporter }
