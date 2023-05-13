import nodemailer, { Transporter } from 'nodemailer';
import config from 'config';

const { host, port, user, pass, mailFrom } = config.get<{
  host: string;
  port: number;
  user: string;
  pass: string;
  mailFrom: string;
}>('mailConfig');

const baseUrl = config.get<string>('baseUrl');

const transporter: Transporter = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass },
  secure: false,
});

const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: mailFrom,
    to,
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
};

const verifyTokenTemplate = (verificationLink: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f5f5f5;
      }
  
      .container {
        max-width: 500px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
  
      h3 {
        color: #333;
      }
  
      p {
        margin: 10px 0;
      }
  
      a {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 3px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h3>Email Verification</h3>
      <p>Thank you for registering. Please click the link below to verify your email address:</p>
      <p><a href="${verificationLink}">Verify Email</a></p>
      <p>If you didn't register, please ignore this email.</p>
    </div>
  </body>
  </html>
  `;
};

export const sendVerifyToken = async (to: string, token: string) => {
  const subject = 'Verify your account';
  const verificationLink = `${baseUrl}/auth/verify-email?token=${token}`;
  const html = verifyTokenTemplate(verificationLink);

  return await sendEmail(to, subject, html);
};
