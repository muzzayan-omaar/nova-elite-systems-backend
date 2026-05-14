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
    const invoice = await Invoice.findById(
      req.params.id
    );

    if (!invoice) {
      return res
        .status(404)
        .json({
          message: "Invoice not found",
        });
    }

    const doc = new PDFDocument({
      margin: 50,
    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoice.invoiceNumber}.pdf`
    );

    doc.pipe(res);

    /* =========================
       COLORS
    ========================= */

    const navy = "#081225";
    const blue = "#2563EB";
    const white = "#FFFFFF";
    const gray = "#94A3B8";
    const light = "#E2E8F0";

    /* =========================
       TOP HEADER
    ========================= */

    doc
      .rect(0, 0, 650, 140)
      .fill(navy);

    doc
      .fillColor(white)
      .fontSize(28)
      .font("Helvetica-Bold")
      .text(
        "NOVA Elite Systems",
        50,
        45
      );

    doc
      .fontSize(11)
      .fillColor(gray)
      .text(
        "Premium digital & infrastructure solutions",
        50,
        82
      );

    doc
      .fontSize(30)
      .fillColor(blue)
      .text("INVOICE", 400, 45);

    doc
      .fontSize(14)
      .fillColor(light)
      .text(
        invoice.invoiceNumber,
        420,
        85
      );

    /* =========================
       BILL TO
    ========================= */

    doc.y = 180;

    doc
      .fontSize(11)
      .fillColor(blue)
      .font("Helvetica-Bold")
      .text("BILL TO");

    doc.moveDown(0.8);

    doc
      .fontSize(18)
      .fillColor("#111827")
      .text(invoice.clientName);

    doc
      .fontSize(11)
      .fillColor(gray)
      .text(invoice.company || "");

    doc.text(invoice.email || "");
    doc.text(invoice.phone || "");

    /* =========================
       INVOICE INFO
    ========================= */

    doc
      .fontSize(11)
      .fillColor(blue)
      .font("Helvetica-Bold")
      .text("INVOICE DETAILS", 370, 180);

    doc
      .fontSize(11)
      .fillColor("#111827")
      .font("Helvetica");

    doc.text(
      `Issue Date: ${invoice.issueDate}`,
      370,
      210
    );

    doc.text(
      `Due Date: ${invoice.dueDate}`,
      370,
      230
    );

    doc.text(
      `Status: ${invoice.status}`,
      370,
      250
    );

    /* =========================
       TABLE HEADER
    ========================= */

    let tableTop = 320;

    doc
      .rect(50, tableTop, 500, 30)
      .fill(navy);

    doc
      .fillColor(white)
      .font("Helvetica-Bold")
      .fontSize(10);

    doc.text(
      "SERVICE",
      60,
      tableTop + 10
    );

    doc.text(
      "QTY",
      330,
      tableTop + 10
    );

    doc.text(
      "PRICE",
      390,
      tableTop + 10
    );

    doc.text(
      "TOTAL",
      470,
      tableTop + 10
    );

    /* =========================
       TABLE ROWS
    ========================= */

    let y = tableTop + 30;

    invoice.items.forEach((item, index) => {
      if (index % 2 === 0) {
        doc
          .rect(50, y, 500, 30)
          .fill("#F8FAFC");
      }

      doc
        .fillColor("#111827")
        .font("Helvetica")
        .fontSize(10);

      doc.text(
        item.service,
        60,
        y + 10
      );

      doc.text(
        item.qty.toString(),
        335,
        y + 10
      );

      doc.text(
        `$${item.price}`,
        390,
        y + 10
      );

      doc.text(
        `$${item.qty * item.price}`,
        470,
        y + 10
      );

      y += 30;
    });

    /* =========================
       TOTAL BOX
    ========================= */

    y += 40;

    doc
      .roundedRect(340, y, 210, 100, 12)
      .fill("#EFF6FF");

    doc
      .fillColor("#111827")
      .fontSize(11);

    doc.text(
      `Subtotal: $${invoice.subtotal}`,
      360,
      y + 20
    );

    doc.text(
      `Tax: $${invoice.tax}`,
      360,
      y + 45
    );

    doc
      .font("Helvetica-Bold")
      .fillColor(blue)
      .fontSize(18)
      .text(
        `Total: $${invoice.total}`,
        360,
        y + 70
      );

    /* =========================
       PAYMENT INFO
    ========================= */

    y += 150;

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor(blue)
      .text("PAYMENT INFORMATION", 50, y);

    y += 25;

    doc
      .font("Helvetica")
      .fontSize(11)
      .fillColor("#111827");

    doc.text(
      `Method: ${invoice.paymentMethod}`,
      50,
      y
    );

    doc.text(
      `Bank: ${invoice.bankName}`,
      50,
      y + 20
    );

    doc.text(
      `Account Name: ${invoice.accountName}`,
      50,
      y + 40
    );

    doc.text(
      `Account Number: ${invoice.accountNumber}`,
      50,
      y + 60
    );

    /* =========================
       SIGNATURE
    ========================= */

    doc
      .font("Helvetica-Oblique")
      .fontSize(24)
      .fillColor("#111827")
      .text(
        "Mirembe Joan",
        380,
        y + 30
      );

    doc
      .moveTo(360, y + 70)
      .lineTo(540, y + 70)
      .strokeColor("#CBD5E1")
      .stroke();

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(gray)
      .text(
        "Sales Manager",
        420,
        y + 80
      );

    /* =========================
       FOOTER
    ========================= */

    doc
      .fontSize(10)
      .fillColor(gray)
      .text(
        "Thank you for choosing NOVA Elite Systems.",
        50,
        760,
        {
          align: "center",
          width: 500,
        }
      );

    doc.end();

  } catch (err) {
    res
      .status(500)
      .json({
        message: err.message,
      });
  }
};