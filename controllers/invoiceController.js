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
      margin: 0,
      size: "A4",
    });

    /* RESPONSE */

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

    const bg = "#050816";
    const card = "#0B1220";
    const primary = "#3B82F6";
    const cyan = "#06B6D4";
    const white = "#FFFFFF";
    const gray = "#9CA3AF";
    const line = "#1F2937";

    /* PAGE BG */

    doc.rect(0, 0, 595, 842).fill(bg);

    /* TOP HERO */

    doc
      .roundedRect(
        35,
        35,
        525,
        120,
        24
      )
      .fill(card);

    /* BRAND */

    doc
      .fillColor(white)
      .font("Helvetica-Bold")
      .fontSize(26)
      .text(
        "NOVA",
        60,
        58
      );

    doc
      .fillColor(primary)
      .text(
        " Elite Systems",
        135,
        58
      );

    doc
      .fillColor(gray)
      .font("Helvetica")
      .fontSize(11)
      .text(
        "Premium digital & infrastructure solutions",
        60,
        95
      );

    /* INVOICE LABEL */

    doc
      .fillColor(gray)
      .fontSize(10)
      .text(
        "OFFICIAL INVOICE",
        390,
        58
      );

    doc
      .fillColor(white)
      .font("Helvetica-Bold")
      .fontSize(24)
      .text(
        invoice.invoiceNumber,
        390,
        78
      );

    /* STATUS */

    doc
      .roundedRect(
        390,
        115,
        110,
        28,
        10
      )
      .fill(primary);

    doc
      .fillColor(white)
      .fontSize(10)
      .font("Helvetica-Bold")
      .text(
        invoice.status || "Pending",
        420,
        124
      );

    /* CLIENT CARD */

    doc
      .roundedRect(
        35,
        185,
        250,
        155,
        22
      )
      .fill(card);

    doc
      .fillColor(primary)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(
        "CLIENT DETAILS",
        55,
        210
      );

    doc
      .fillColor(white)
      .fontSize(20)
      .text(
        invoice.clientName ||
          "Client Name",
        55,
        238
      );

    doc
      .fillColor(gray)
      .fontSize(11)
      .font("Helvetica")
      .text(
        invoice.company || "-",
        55,
        272
      );

    doc.text(
      invoice.email || "-",
      55,
      292
    );

    doc.text(
      invoice.phone || "-",
      55,
      312
    );

    /* INVOICE INFO CARD */

    doc
      .roundedRect(
        310,
        185,
        250,
        155,
        22
      )
      .fill(card);

    doc
      .fillColor(primary)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(
        "INVOICE DETAILS",
        330,
        210
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
        "Payment",
        invoice.paymentMethod ||
          "-",
      ],
      [
        "Bank",
        invoice.bankName || "-",
      ],
    ];

    let detailY = 245;

    details.forEach((item) => {
      doc
        .fillColor(gray)
        .fontSize(10)
        .font("Helvetica")
        .text(
          item[0],
          330,
          detailY
        );

      doc
        .fillColor(white)
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(
          item[1],
          430,
          detailY
        );

      detailY += 26;
    });

    /* TABLE */

    const tableTop = 390;

    doc
      .roundedRect(
        35,
        tableTop,
        525,
        42,
        14
      )
      .fill(primary);

    doc
      .fillColor(white)
      .font("Helvetica-Bold")
      .fontSize(11);

    doc.text(
      "SERVICE",
      55,
      tableTop + 15
    );

    doc.text(
      "QTY",
      330,
      tableTop + 15
    );

    doc.text(
      "PRICE",
      395,
      tableTop + 15
    );

    doc.text(
      "TOTAL",
      485,
      tableTop + 15
    );

    /* ITEMS */

    let y = tableTop + 55;

    invoice.items.forEach(
      (item, index) => {
        const itemTotal =
          item.qty * item.price;

        doc
          .roundedRect(
            35,
            y - 8,
            525,
            48,
            14
          )
          .fill(
            index % 2 === 0
              ? "#0F172A"
              : "#111827"
          );

        doc
          .fillColor(white)
          .font("Helvetica-Bold")
          .fontSize(11)
          .text(
            item.service ||
              "Service",
            55,
            y + 7
          );

        doc
          .fillColor(gray)
          .font("Helvetica")
          .fontSize(9)
          .text(
            "Premium business solution",
            55,
            y + 23
          );

        doc
          .fillColor(white)
          .fontSize(11)
          .text(
            String(item.qty),
            340,
            y + 15
          );

        doc.text(
          `$${item.price}`,
          395,
          y + 15
        );

        doc
          .fillColor(cyan)
          .font("Helvetica-Bold")
          .text(
            `$${itemTotal}`,
            485,
            y + 15
          );

        y += 58;
      }
    );

    /* TOTAL CARD */

    doc
      .roundedRect(
        340,
        y + 20,
        220,
        120,
        22
      )
      .fill(card);

    doc
      .fillColor(gray)
      .font("Helvetica")
      .fontSize(11)
      .text(
        "Subtotal",
        365,
        y + 45
      );

    doc.text(
      "Tax",
      365,
      y + 70
    );

    doc
      .fillColor(white)
      .font("Helvetica-Bold")
      .fontSize(13)
      .text(
        `$${invoice.subtotal}`,
        490,
        y + 45
      );

    doc.text(
      `$${invoice.tax}`,
      490,
      y + 70
    );

    doc
      .moveTo(360, y + 100)
      .lineTo(540, y + 100)
      .stroke(line);

    doc
      .fillColor(primary)
      .fontSize(20)
      .text(
        `$${invoice.total}`,
        465,
        y + 110
      );

    doc
      .fillColor(gray)
      .fontSize(10)
      .font("Helvetica")
      .text(
        "TOTAL",
        365,
        y + 115
      );

    /* PAYMENT SECTION */

    const paymentY = y + 180;

    doc
      .roundedRect(
        35,
        paymentY,
        260,
        135,
        22
      )
      .fill(card);

    doc
      .fillColor(primary)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(
        "PAYMENT INFORMATION",
        55,
        paymentY + 24
      );

    const paymentDetails = [
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
      [
        "Bank",
        invoice.bankName || "-",
      ],
    ];

    let py = paymentY + 55;

    paymentDetails.forEach((item) => {
      doc
        .fillColor(gray)
        .font("Helvetica")
        .fontSize(10)
        .text(
          item[0],
          55,
          py
        );

      doc
        .fillColor(white)
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(
          item[1],
          55,
          py + 14
        );

      py += 36;
    });

    /* NOTES */

    doc
      .roundedRect(
        315,
        paymentY,
        245,
        135,
        22
      )
      .fill(card);

    doc
      .fillColor(primary)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(
        "NOTES",
        335,
        paymentY + 24
      );

    doc
      .fillColor(gray)
      .font("Helvetica")
      .fontSize(10)
      .text(
        invoice.notes ||
          "Thank you for choosing NOVA Elite Systems.",
        335,
        paymentY + 55,
        {
          width: 190,
          lineGap: 4,
        }
      );

    /* SIGNATURE */

    const sigY = 760;

    doc
      .moveTo(370, sigY)
      .lineTo(530, sigY)
      .stroke("#374151");

    doc
      .fillColor(white)
      .font("Helvetica-Oblique")
      .fontSize(20)
      .text(
        "Mirembe Joan",
        385,
        sigY - 28
      );

    doc
      .fillColor(gray)
      .font("Helvetica")
      .fontSize(10)
      .text(
        "Sales Manager",
        420,
        sigY + 10
      );

    /* FOOTER */

    doc
      .fillColor(gray)
      .fontSize(9)
      .text(
        "NOVA Elite Systems • Premium Digital Solutions",
        0,
        815,
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