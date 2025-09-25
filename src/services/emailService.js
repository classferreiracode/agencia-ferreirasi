import { createTransporter } from '@/services/configMailService'

export const sendEmail = async (email) => {
    try {
        const mailOptions = {
            from: 'ferreirasi.tk@outlook.com',
            to: 'ferreirasi.tk@outlook.com',
            subject: `Mensagem de contato ${email.selectedService}`,
            text: `Name: ${email.name}\nEmail: ${email.email}\nPhone: ${email.phone}\nService: ${email.selectedService}\nMessage: ${email.message}`,
        }
        await createTransporter().sendMail(mailOptions)

        return true
    } catch (error) {
        console.error(error)
        return false
    }
}
