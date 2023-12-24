import nodemailer from "nodemailer";

const createEmailTransporter = () => {
  let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter;
};

export const sendEmail = async (to: string, subject: string, html: string) => {
  return new Promise((resolve, reject) => {
    let transporter = createEmailTransporter();

    let options = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html,
    };

    transporter.sendMail(options, (err) => {
      if (err) {
        console.log(err);
        return reject({ message: "An error has occured in sending email" });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
};
