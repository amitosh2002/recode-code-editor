import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import hbs from 'nodemailer-express-handlebars';
import dotenv from "dotenv";
dotenv.config();

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Setup transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {

    user: process.env.SUPPORT_EMAIL,
    pass: process.env.SUPPORT_EMAIL_PASSWORD,
  },
});
console.log(process.env.SUPPORT_EMAIL, 'support email');
console.log('Sender email:', process.env.SUPPORT_EMAIL_PASSWORD);
// 2. Configure handlebars with nodemailer
transporter.use(
  'compile',
  hbs({
    viewEngine: {
      extname: '.handlebars',
      partialsDir: path.resolve(__dirname, '../Views'),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, '../Views'),
    extName: '.handlebars',
  })
);

// 3. Send email
// const sendSignupEmail = async ({ to, name }) => {
//   const mailOptions = {
//     from: '"Re/code" <recode-mail-service@gmail.com>',
//     to,
//     subject: 'Welcome to Re/code!',
//     template: 'registerEmailTemp', // without .handlebars
//     context: { name },
//   };

//   await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully!');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT} and email sent`));
// };

const sendSignupEmail = async ({ to, name }) => {
  const mailOptions = {
    from: '"Re/code" <recode-mail-service@gmail.com>',
    to,
    subject: 'Welcome to Re/code!',
    template: 'registerEmailTemp',
    context: { name },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (err) {
    console.error('Error sending email:', err.message);
  }
};

export default sendSignupEmail;
