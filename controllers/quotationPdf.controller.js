import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

import Quotation from "../models/Quotation.model.js";

export const downloadQuotationPDF = async (
  req,
  res
) => {
  try {
    const quotation =
      await Quotation.findById(
        req.params.id
      );

    if (!quotation) {
      return res.status(404).json({
        message: "Quotation not found",
      });
    }

    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${quotation.quotationNumber}.pdf`
    );

    doc.pipe(res);

    const navy = "#0B1220";
    const blue = "#2563eb";
    const light = "#94a3b8";
    const dark = "#111827";
    const border = "#dbe4ee";

    /* PAGE */

    doc.rect(0, 0, 595, 842).fill("#ffffff");

    /* HEADER */

    doc
      .rect(0, 0, 595, 110)
      .fill(navy);

    const logoPath = path.join(
      process.cwd(),
      "assets",
      "logo.png"
    );

    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 42, 20, {
        width: 63,
      });
    }

    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(22)
      .text(
        "NOVA Elite Systems",
        120,
        34
      );

    doc
      .fillColor("#cbd5e1")
      .fontSize(9)
      .font("Helvetica")
      .text(
        "Premium Digital & Infrastructure Solutions",
        120,
        60
      );

    doc
      .fontSize(8.5)
      .text(
        "Email: support@novaelitesystems.com",
        120,
        78
      );

    doc.text(
      "Phone: +971 524 947 730",
      320,
      78
    );

    /* TITLE */

    doc
      .fillColor(blue)
      .font("Helvetica-Bold")
      .fontSize(24)
      .text(
        "QUOTATION",
        400,
        35
      );

    doc
      .fillColor("white")
      .fontSize(10)
      .font("Helvetica")
      .text(
        quotation.quotationNumber,
        405,
        67
      );

    /* CLIENT */

    let y = 140;

    doc
      .fillColor(blue)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(
        "CLIENT",
        40,
        y
      );

    doc
      .fillColor(dark)
      .fontSize(16)
      .text(
        quotation.clientName || "-",
        40,
        y + 18
      );

    doc
      .fillColor(light)
      .fontSize(9)
      .text(
        quotation.company || "",
        40,
        y + 42
      );

    doc.text(
      quotation.email || "",
      40,
      y + 56
    );

    /* PROJECT */

    doc
      .fillColor(blue)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(
        "PROJECT",
        390,
        y
      );

    doc
      .fillColor(dark)
      .font("Helvetica")
      .fontSize(9);

    doc.text(
      `Title: ${
        quotation.projectTitle || "-"
      }`,
      390,
      y + 20
    );

    doc.text(
      `Type: ${
        quotation.projectType || "-"
      }`,
      390,
      y + 38
    );

    doc.text(
      `Timeline: ${
        quotation.timeline || "-"
      }`,
      390,
      y + 56
    );

    /* TABLE */

    const tableTop = 250;

    doc
      .roundedRect(
        40,
        tableTop,
        515,
        28,
        6
      )
      .fill(navy);

    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(9);

    doc.text(
      "DESCRIPTION",
      52,
      tableTop + 10
    );

    doc.text(
      "QTY",
      340,
      tableTop + 10
    );

    doc.text(
      "PRICE",
      405,
      tableTop + 10
    );

    doc.text(
      "TOTAL",
      490,
      tableTop + 10
    );

    let itemY = tableTop + 35;

    quotation.items.forEach(
      (item, index) => {
        const total =
          item.qty * item.price;

        if (index % 2 === 0) {
          doc
            .rect(
              40,
              itemY - 4,
              515,
              24
            )
            .fill("#f8fafc");
        }

        doc
          .fillColor(dark)
          .font("Helvetica")
          .fontSize(9);

        doc.text(
          item.description || "-",
          52,
          itemY + 3,
          {
            width: 250,
          }
        );

        doc.text(
          String(item.qty),
          345,
          itemY + 3
        );

        doc.text(
          `UGX ${item.price}`,
          405,
          itemY + 3
        );

        doc.text(
          `UGX ${total}`,
          490,
          itemY + 3
        );

        itemY += 24;
      }
    );

    /* TOTALS */

    const totalsY =
      itemY + 30;

    doc
      .roundedRect(
        345,
        totalsY,
        210,
        60,
        10
      )
      .stroke(border);

    doc
      .fillColor(light)
      .fontSize(9);

    doc.text(
      "Subtotal",
      360,
      totalsY + 14
    );

    doc.text(
      `UGX ${quotation.subtotal}`,
      480,
      totalsY + 14
    );

    doc
      .fillColor(blue)
      .font("Helvetica-Bold")
      .fontSize(14);

    doc.text(
      "TOTAL",
      360,
      totalsY + 36
    );

    doc.text(
      `UGX ${quotation.total}`,
      480,
      totalsY + 36
    );

    /* PAYMENT TERMS */

    const paymentY =
      totalsY + 100;

    doc
      .fillColor(blue)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(
        "PAYMENT TERMS",
        40,
        paymentY
      );

    doc
      .fillColor(dark)
      .font("Helvetica")
      .fontSize(9)
      .text(
        quotation.paymentTerms ||
          "50% upfront, 50% on completion",
        40,
        paymentY + 20
      );

    /* NOTES */

    doc
      .fillColor(blue)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(
        "NOTES",
        320,
        paymentY
      );

    doc
      .fillColor(light)
      .font("Helvetica")
      .fontSize(8.5)
      .text(
        quotation.notes ||
          "Thank you for considering NOVA Elite Systems.",
        320,
        paymentY + 20,
        {
          width: 220,
        }
      );

    /* SIGNATURE */

    const signY = 720;

    doc
      .moveTo(380, signY)
      .lineTo(540, signY)
      .stroke("#cbd5e1");

    doc
      .fillColor(dark)
      .fontSize(16)
      .text(
        "Mirembe Joan",
        395,
        signY - 22
      );

    doc
      .fillColor(light)
      .fontSize(8)
      .text(
        "Sales Manager",
        430,
        signY + 8
      );

    /* FOOTER */

    doc
      .fontSize(8)
      .fillColor(light)
      .text(
        "NOVA Elite Systems • Premium Business Solutions",
        0,
        780,
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