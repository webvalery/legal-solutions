import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

const { EMAIL_HOST, EMAIL_HOST_PASSWORD, EMAIL_HOST_USER, EMAIL_PORT} = process.env;

class Mail {
  #transporter = null;
  constructor() {
    this.#transporter = this.#getTransporter();
  }

  #getTransporter() {
    return nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: true,
      auth: {
        user: EMAIL_HOST_USER,
        pass: EMAIL_HOST_PASSWORD
      }
    })
  }

  async send(reciever, message) {
    try {
      const info = await this.#transporter.sendMail({
        from: 'valeractar@mail.ru',
        to: 'valeractar@mail.ru',
        subject: 'Welcome to TEST SITE',
        text: message,
        html: `<b>${message}</b>`
      })
      return info.messageId
    } catch (error) {
      return error
    }
  }
}

export default new Mail()