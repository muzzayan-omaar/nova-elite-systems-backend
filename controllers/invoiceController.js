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
export const downloadInvoicePDF = async (
  req,
  res
) => {
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

    /* RESPONSE HEADERS */

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoice.invoiceNumber}.pdf`
    );

    doc.pipe(res);

    /* COLORS */

    const primary = "#2563eb";
    const dark = "#111827";
    const gray = "#6b7280";

    /* TOP HEADER */

    doc
      .rect(0, 0, 700, 120)
      .fill("#0B1220");

    doc
      .fillColor("white")
      .fontSize(28)
      .font("Helvetica-Bold")
      .text(
        "NOVA Elite Systems",
        50,
        45
      );

    doc
      .fontSize(12)
      .fillColor("#9ca3af")
      .text(
        "Premium digital & infrastructure solutions",
        50,
        78
      );

    /* INVOICE INFO */

    doc
      .fillColor(primary)
      .fontSize(24)
      .font("Helvetica-Bold")
      .text(
        "INVOICE",
        400,
        45
      );

    doc
      .fillColor("white")
      .fontSize(11)
      .font("Helvetica")
      .text(
        invoice.invoiceNumber,
        400,
        78
      );

    /* CLIENT SECTION */

    doc
      .fillColor(primary)
      .fontSize(13)
      .font("Helvetica-Bold")
      .text("Bill To", 50, 150);

    doc
      .fillColor(dark)
      .fontSize(18)
      .text(
        invoice.clientName || "-",
        50,
        172
      );

    doc
      .fillColor(gray)
      .fontSize(11)
      .text(
        invoice.company || "",
        50,
        198
      );

    doc.text(
      invoice.email || "",
      50,
      215
    );

    doc.text(
      invoice.phone || "",
      50,
      232
    );

    /* DATES */

    doc
      .fillColor(primary)
      .fontSize(13)
      .font("Helvetica-Bold")
      .text(
        "Invoice Details",
        400,
        150
      );

    doc
      .fillColor(dark)
      .fontSize(11)
      .font("Helvetica");

    doc.text(
      `Issue Date: ${
        invoice.issueDate || "-"
      }`,
      400,
      180
    );

    doc.text(
      `Due Date: ${
        invoice.dueDate || "-"
      }`,
      400,
      200
    );

    doc.text(
      `Status: ${
        invoice.status || "-"
      }`,
      400,
      220
    );

    /* TABLE HEADER */

    const tableTop = 300;

    doc
      .rect(50, tableTop, 500, 35)
      .fill(primary);

    doc
      .fillColor("white")
      .fontSize(11)
      .font("Helvetica-Bold");

    doc.text(
      "Service",
      60,
      tableTop + 11
    );

    doc.text(
      "Qty",
      320,
      tableTop + 11
    );

    doc.text(
      "Price",
      390,
      tableTop + 11
    );

    doc.text(
      "Total",
      470,
      tableTop + 11
    );

    /* ITEMS */

    let y = tableTop + 40;

    invoice.items.forEach((item) => {
      const itemTotal =
        item.qty * item.price;

      doc
        .rect(50, y - 5, 500, 30)
        .stroke("#e5e7eb");

      doc
        .fillColor(dark)
        .font("Helvetica")
        .fontSize(10);

      doc.text(
        item.service || "-",
        60,
        y + 5
      );

      doc.text(
        String(item.qty),
        325,
        y + 5
      );

      doc.text(
        `$${item.price}`,
        390,
        y + 5
      );

      doc.text(
        `$${itemTotal}`,
        470,
        y + 5
      );

      y += 30;
    });

    /* TOTALS */

    y += 40;

    doc
      .fontSize(11)
      .fillColor(gray)
      .text(
        `Subtotal: $${invoice.subtotal}`,
        400,
        y
      );

    doc.text(
      `Tax: $${invoice.tax}`,
      400,
      y + 20
    );

    doc
      .fillColor(primary)
      .font("Helvetica-Bold")
      .fontSize(18)
      .text(
        `Total: $${invoice.total}`,
        400,
        y + 50
      );

    /* PAYMENT INFO */

    y += 120;

    doc
      .fillColor(primary)
      .fontSize(14)
      .font("Helvetica-Bold")
      .text(
        "Payment Information",
        50,
        y
      );

    doc
      .fillColor(dark)
      .fontSize(11)
      .font("Helvetica");

    doc.text(
      `Method: ${
        invoice.paymentMethod ||
        "-"
      }`,
      50,
      y + 30
    );

    doc.text(
      `Bank: ${
        invoice.bankName || "-"
      }`,
      50,
      y + 50
    );

    doc.text(
      `Account Name: ${
        invoice.accountName || "-"
      }`,
      50,
      y + 70
    );

    doc.text(
      `Account Number: ${
        invoice.accountNumber ||
        "-"
      }`,
      50,
      y + 90
    );

    /* NOTES */

    if (invoice.notes) {
      doc
        .fillColor(primary)
        .fontSize(14)
        .font("Helvetica-Bold")
        .text("Notes", 320, y);

      doc
        .fillColor(gray)
        .fontSize(10)
        .font("Helvetica")
        .text(
          invoice.notes,
          320,
          y + 30,
          {
            width: 220,
          }
        );
    }

    /* SIGNATURE */

    y += 170;

    doc
      .moveTo(380, y)
      .lineTo(540, y)
      .stroke("#9ca3af");

    doc
      .fontSize(18)
      .font("Helvetica-Oblique")
      .fillColor(dark)
      .text(
        "Mirembe Joan",
        390,
        y - 25
      );

    doc
      .fontSize(10)
      .fillColor(gray)
      .text(
        "Sales Manager",
        420,
        y + 10
      );

    /* FOOTER */

    doc
      .fontSize(9)
      .fillColor("#9ca3af")
      .text(
        "Thank you for choosing NOVA Elite Systems.",
        50,
        760,
        {
          align: "center",
        }
      );

    doc.end();

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};