const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendInquiry = async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MYEMAIL,
      pass: process.env.MYPASS,
    },
  });

  const mailOptions = {
    from: process.env.MYEMAIL,
    to: process.env.TO_EMAIL,
    subject: `Inquiry from ${name}`,
    text: `Name: ${name} \nEmail: ${email}\n Subject: ${subject} \nMessage: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).redirect("/thankyou");
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error sending email. Please try again." });
  }
};
