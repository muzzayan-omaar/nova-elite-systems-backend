import Invoice from "../models/Invoice.js";
import PDFDocument from "pdfkit";

export const generateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    const doc = new PDFDocument();

    doc.text(`Tax: $${invoice.tax}`);

    doc
      .fontSize(16)
      .fillColor("#2563EB")
      .text(`Total: $${invoice.total}`);

    doc.moveDown(2);

    /* PAYMENT */

    doc
      .fontSize(15)
      .fillColor("#2563EB")
      .text("Payment Information");

    doc.moveDown(1);

    doc
      .fontSize(11)
      .fillColor("black")
      .text(`Payment Method: ${invoice.paymentMethod}`);

    doc.text(`Bank Name: ${invoice.bankName}`);

    doc.text(`Account Name: ${invoice.accountName}`);

    doc.text(`Account Number: ${invoice.accountNumber}`);

    doc.moveDown(3);

    /* SIGNATURE */

    doc.text("____________________________");

    doc
      .fontSize(12)
      .fillColor("black")
      .text("Mirembe Joan");

    doc
      .fontSize(10)
      .fillColor("gray")
      .text("Sales Manager");

    doc.end();

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};