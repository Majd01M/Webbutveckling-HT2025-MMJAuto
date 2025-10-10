import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,           // sandbox.smtp.mailtrap.io
  port: Number(process.env.EMAIL_PORT),   // 2525
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: false, // Mailtrap does NOT require SSL
});

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"MMJAuto" <${process.env.EMAIL_USER}>`,
      to,      // can be a single email or array of emails
      subject,
      text,
    });
    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.error("❌ Mail sending failed:", error);
  }
};