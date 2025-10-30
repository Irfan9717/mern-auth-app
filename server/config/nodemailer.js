import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // ✅ important for port 587 (STARTTLS)
  auth: {
    user: process.env.SMTP_USER, // ✅ Your Brevo SMTP login (the email used on Brevo)
    pass: process.env.SMTP_PASS, // ✅ The Brevo SMTP key
  },
  tls: {
    rejectUnauthorized: false, // ✅ prevent self-signed certificate issues
  },
});

export default transporter;
