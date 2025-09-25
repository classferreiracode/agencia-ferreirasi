// server/emailService.js
import { createTransporter } from './configMailService.js'

export async function sendEmail(email) {
    try {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            subject: `Mensagem de contato: ${email.selectedService}`,
            text: `
        Nome: ${email.name}
        Email: ${email.email}
        Telefone: ${email.phone}
        Serviço: ${email.selectedService}
        Mensagem: ${email.message}
      `,
        }

        await createTransporter().sendMail(mailOptions)
        return true
    } catch (err) {
        console.error('Erro ao enviar e-mail:', err)
        return false
    }
}
