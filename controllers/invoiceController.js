import Invoice from "../models/Invoice.js";
import PDFDocument from "pdfkit";

/* CREATE INVOICE */
export const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET INVOICES */
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE INVOICE */
export const deleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: "Invoice deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* PDF GENERATION */
export const downloadInvoicePDF = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${invoice._id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("INVOICE", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Tax: $${invoice.tax}`);
    doc.text(`Total: $${invoice.total}`);
    doc.moveDown();

    doc.fontSize(14).text("Payment Information");
    doc.fontSize(11).text(`Method: ${invoice.paymentMethod}`);
    doc.text(`Bank: ${invoice.bankName}`);
    doc.text(`Account Name: ${invoice.accountName}`);
    doc.text(`Account Number: ${invoice.accountNumber}`);

    doc.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};