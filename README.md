# Ringvio Marketing Site & Simple Backend

## Prerequisites
* Node.js 18+
* npm

## Setup

```bash
npm install
```

Create a `.env` file with:

```
PORT=3000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
CONTACT_TO=hello@ringvio.co.uk
```

## Run locally

```bash
npm start
```

Open http://localhost:3000 in your browser.

## Deploy

Any Node-compatible host (Railway, Render, Heroku, Fly, etc.) or Docker:

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install --production
ENV NODE_ENV=production
CMD ["npm","start"]
```

## Notes

* This backend sends signup/contact notifications via Nodemailer.
* For production, use a proper database or CRM integration.
