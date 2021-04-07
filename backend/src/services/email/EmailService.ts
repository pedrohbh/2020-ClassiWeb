import { Service } from '@tsed/di';
import nodemailer from 'nodemailer';
import SMTP_CONFIG from './smtp';

@Service()
export class EmailService {
  private readonly transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass,
    },
    tls: {
        rejectUnauthorized: false,
    },
  });

  async send(to: string, subject: string, message: string) {
    const mailSend = await this.transporter.sendMail({
        subject: subject,
        from: "ClassiWeb <noreply.classiweb@gmail.com>",    // De quem
        to: [to, "noreply.classiweb@gmail.com"],            // Para quem
        html: `
        <html>
        <body>
            ${message}
        <body>
        <html>
        `
    })
  }
}