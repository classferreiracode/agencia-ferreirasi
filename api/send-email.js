import nodemailer from 'nodemailer'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' })
    }

    const { name, email, phone, selectedService, message } = req.body

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        })

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            subject: `Mensagem de contato: ${selectedService}`,
            text: `
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone}
        Serviço: ${selectedService}
        Mensagem: ${message}
      `,
        })

        return res.status(200).json({ success: true })
    } catch (err) {
        console.error('Erro ao enviar email:', err)
        return res.status(500).json({ success: false, error: err.message })
    }
}
