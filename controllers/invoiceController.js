import Invoice from "../models/Invoice.js";
import PDFDocument from "pdfkit";

/* CREATE INVOICE */
export const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);

    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* GET INVOICES */
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();

    res.json(invoices);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* DELETE INVOICE */
export const deleteInvoice = async (
  req,
  res
) => {
  try {
    await Invoice.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Invoice deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* DOWNLOAD PDF */
export const downloadInvoicePDF = async (
  req,
  res
) => {
  try {
    const invoice =
      await Invoice.findById(
        req.params.id
      );

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
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

    /* COLORS */

    const dark = "#0B1220";
    const primary = "#2563EB";
    const gray = "#6B7280";
    const light = "#E5E7EB";

    /* HEADER */

    doc
      .rect(0, 0, 700, 90)
      .fill(dark);

    /* LOGO */

    try {
      doc.image(
        "https://res.cloudinary.com/diszilwhc/image/upload/v1777939226/IMG_20260422_200643_073_fdpjkb.webp",
        45,
        24,
        {
          width: 42,
        }
      );
    } catch (err) {
      console.log("Logo failed");
    }

    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(20)
      .text(
        "NOVA Elite Systems",
        98,
        30
      );

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#CBD5E1")
      .text(
        "Premium digital & infrastructure solutions",
        98,
        52
      );

    /* INVOICE RIGHT */

    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(24)
      .text(
        "INVOICE",
        420,
        28
      );

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(
        invoice.invoiceNumber,
        425,
        55
      );

    /* CLIENT + DETAILS */

    let y = 120;

    doc
      .fillColor(primary)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("BILL TO", 50, y);

    doc
      .fillColor(dark)
      .fontSize(16)
      .text(
        invoice.clientName ||
          "-",
        50,
        y + 18
      );

    doc
      .fillColor(gray)
      .fontSize(10)
      .font("Helvetica")
      .text(
        invoice.company || "",
        50,
        y + 40
      );

    doc.text(
      invoice.email || "",
      50,
      y + 55
    );

    doc.text(
      invoice.phone || "",
      50,
      y + 70
    );

    /* RIGHT SIDE */

    doc
      .fillColor(primary)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(
        "DETAILS",
        390,
        y
      );

    const details = [
      [
        "Issue Date",
        invoice.issueDate || "-",
      ],
      [
        "Due Date",
        invoice.dueDate || "-",
      ],
      [
        "Status",
        invoice.status || "-",
      ],
      [
        "Method",
        invoice.paymentMethod ||
          "-",
      ],
    ];

    let detailY = y + 18;

    details.forEach((item) => {
      doc
        .fillColor(gray)
        .fontSize(10)
        .text(
          `${item[0]}:`,
          390,
          detailY
        );

      doc
        .fillColor(dark)
        .font("Helvetica-Bold")
        .text(
          item[1],
          470,
          detailY
        );

      detailY += 18;
    });

    /* LINE */

    y = 235;

    doc
      .moveTo(50, y)
      .lineTo(545, y)
      .stroke(light);

    /* TABLE */

    y += 20;

    doc
      .fillColor(gray)
      .font("Helvetica-Bold")
      .fontSize(10);

    doc.text(
      "SERVICE",
      50,
      y
    );

    doc.text(
      "QTY",
      340,
      y
    );

    doc.text(
      "PRICE",
      410,
      y
    );

    doc.text(
      "TOTAL",
      490,
      y
    );

    y += 18;

    doc
      .moveTo(50, y)
      .lineTo(545, y)
      .stroke(light);

    y += 12;

    /* ITEMS */

    invoice.items.forEach((item) => {
      const itemTotal =
        item.qty * item.price;

      doc
        .fillColor(dark)
        .font("Helvetica")
        .fontSize(10)
        .text(
          item.service || "-",
          50,
          y
        );

      doc.text(
        String(item.qty),
        345,
        y
      );

      doc.text(
        `$${item.price}`,
        410,
        y
      );

      doc
        .font("Helvetica-Bold")
        .text(
          `$${itemTotal}`,
          490,
          y
        );

      y += 24;

      doc
        .moveTo(50, y)
        .lineTo(545, y)
        .stroke("#F3F4F6");

      y += 10;
    });

    /* TOTALS */

    y += 10;

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(gray);

    doc.text(
      "Subtotal:",
      400,
      y
    );

    doc.text(
      `$${invoice.subtotal}`,
      490,
      y
    );

    y += 18;

    doc.text(
      "Tax:",
      400,
      y
    );

    doc.text(
      `$${invoice.tax}`,
      490,
      y
    );

    y += 28;

    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .fillColor(primary)
      .text(
        `$${invoice.total}`,
        450,
        y
      );

    /* PAYMENT INFO */

    y += 60;

    doc
      .fillColor(primary)
      .fontSize(10)
      .text(
        "PAYMENT INFORMATION",
        50,
        y
      );

    y += 20;

    const payment = [
      [
        "Bank",
        invoice.bankName || "-",
      ],
      [
        "Account Name",
        invoice.accountName ||
          "-",
      ],
      [
        "Account Number",
        invoice.accountNumber ||
          "-",
      ],
    ];

    payment.forEach((p) => {
      doc
        .fillColor(gray)
        .font("Helvetica")
        .fontSize(10)
        .text(
          `${p[0]}:`,
          50,
          y
        );

      doc
        .fillColor(dark)
        .font("Helvetica-Bold")
        .text(
          p[1],
          160,
          y
        );

      y += 18;
    });

    /* NOTES */

    if (invoice.notes) {
      doc
        .fillColor(primary)
        .fontSize(10)
        .text(
          "NOTES",
          340,
          y - 54
        );

      doc
        .fillColor(gray)
        .font("Helvetica")
        .fontSize(9)
        .text(
          invoice.notes,
          340,
          y - 34,
          {
            width: 200,
          }
        );
    }

    /* SIGNATURE */

    y += 45;

    doc
      .moveTo(390, y)
      .lineTo(540, y)
      .stroke(light);

    doc
      .font("Helvetica-Oblique")
      .fontSize(16)
      .fillColor(dark)
      .text(
        "Mirembe Joan",
        410,
        y - 22
      );

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(gray)
      .text(
        "Sales Manager",
        435,
        y + 8
      );

    /* FOOTER */

    doc
      .fontSize(8)
      .fillColor("#9CA3AF")
      .text(
        "Thank you for choosing NOVA Elite Systems",
        0,
        800,
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