import express from 'express';
import { sendEmail } from '../providers/mailer.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Route for sending an email
router.post('/', async (req, res) => {
    const { name, email, company, message } = req.body;

    try {
        const subject = `New message from ${name} (${email})`;
        const text = `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\n\nMessage:\n${message}`;
        const html = `<p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Company:</strong> ${company || 'N/A'}</p>
                  <p><strong>Message:</strong><br/>${message}</p>`;

        await sendEmail(process.env.EMAIL_USER, subject, text, html);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

export default router;
