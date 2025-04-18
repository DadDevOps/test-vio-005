require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Example: handle signup form submission
app.post('/api/signup', async (req, res) => {
  // TODO: store user or send email; placeholder response
  res.json({ message: 'Thank you for signing up! Our team will be in touch.' });
});

// Example: handle contact form submission
app.post('/api/contact', async (req, res) => {
  const { first, last, email, subject, message } = req.body;
  try {
    // configure transporter with env SMTP creds
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({
      from: email,
      to: process.env.CONTACT_TO || 'support@ringvio.co.uk',
      subject: `[Ringvio Contact] ${subject}`,
      text: `Name: ${first} ${last}\nEmail: ${email}\n\n${message}`
    });
    res.json({ sent: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ sent: false, error: 'Email failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Ringvio server running on ${PORT}`));
