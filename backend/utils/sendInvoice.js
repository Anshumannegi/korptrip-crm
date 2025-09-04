// const nodemailer = require("nodemailer");
// const path = require("path");
import nodemailer from "nodemailer";
import path from "path";

const sendInvoice = async (invoiceData, pdfPath) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.Pass,
      },
    });

    const mailOptions = {
      from: process.env.Email,
      to: invoiceData.customerEmail,
      subject: `Your Travel Invoice - ${invoiceData.invoiceNumber}`,
      text: `Hello ${invoiceData.customerName},\n\nThank you for booking with Korp-Trip!\nPlease find your invoice attached.\n\nBest Regards,\nKorp-Trip Team`,
      attachments: [
        {
          filename: `Invoice-${invoiceData.invoiceNumber}.pdf`,
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Invoice Email Sends Successfully");
  } catch (error) {
    console.log("Error in Sending Invoice Email", error);
  }
};

// module.exports = sendInvoice;
export default sendInvoice;
