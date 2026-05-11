import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// In-memory message store (in production, use a database)
const messages = [];

// POST /api/contact — Send contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Store the message
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    };
    messages.unshift(newMessage);

    // Send email notification if SMTP is configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || 'shafanmanaz05@gmail.com',
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #06b6d4;">New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 1px solid #eee;">
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
        `,
      });
    }

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// GET /api/contact/messages — Get all messages (admin only, handled by middleware in portfolio routes)
router.get('/messages', (req, res) => {
  res.json(messages);
});

// PATCH /api/contact/messages/:id/read — Mark message as read
router.patch('/messages/:id/read', (req, res) => {
  const msg = messages.find(m => m.id === req.params.id);
  if (!msg) return res.status(404).json({ error: 'Message not found' });
  msg.read = true;
  res.json(msg);
});

// DELETE /api/contact/messages/:id — Delete a message
router.delete('/messages/:id', (req, res) => {
  const index = messages.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Message not found' });
  messages.splice(index, 1);
  res.json({ success: true });
});

export default router;
