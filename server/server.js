// server/server.js
import express from 'express'
import cors from 'cors'
import { sendEmail } from './emailService.js'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

// Rota para enviar e-mail
app.post('/api/send-email', async (req, res) => {
    const ok = await sendEmail(req.body)
    if (ok) {
        res.status(200).json({ success: true })
    } else {
        res.status(500).json({ success: false })
    }
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})
