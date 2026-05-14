import Invoice from "../models/Invoice.js";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

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
export const downloadInvoicePDF =
  async (req, res) => {
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
        size: "A4",
        margin: 40,
      });

      /* HEADERS */

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

      const navy = "#0B1220";
      const blue = "#2563eb";
      const light = "#94a3b8";
      const dark = "#111827";
      const border = "#dbe4ee";

      /* PAGE BG */

      doc
        .rect(0, 0, 595, 842)
        .fill("#ffffff");

      /* TOP HEADER */

      doc
        .rect(0, 0, 595, 110)
        .fill(navy);

      /* LOGO */

      const logoPath = path.join(
        process.cwd(),
        "assets",
        "logo.png"
      );

      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 42, 28, {
          width: 65,
        });
      }

      /* COMPANY */

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
        .font("Helvetica")
        .fontSize(9)
        .text(
          "Premium Digital & Infrastructure Solutions",
          120,
          60
        );

      /* CONTACTS */

      doc
        .fillColor("#cbd5e1")
        .fontSize(8.5)
        .text(
          "Email: novaelitesystems@gmail.com",
          120,
          78
        );

      doc.text(
        "Phone: +971 58 000 0000",
        320,
        78
      );

      /* INVOICE TITLE */

      doc
        .fillColor(blue)
        .font("Helvetica-Bold")
        .fontSize(24)
        .text("INVOICE", 430, 35);

      doc
        .fillColor("white")
        .font("Helvetica")
        .fontSize(10)
        .text(
          invoice.invoiceNumber,
          432,
          67
        );

      /* CLIENT SECTION */

      let y = 140;

      doc
        .fillColor(blue)
        .font("Helvetica-Bold")
        .fontSize(11)
        .text("BILLED TO", 40, y);

      doc
        .fillColor(dark)
        .fontSize(16)
        .text(
          invoice.clientName || "-",
          40,
          y + 18
        );

      doc
        .fillColor(light)
        .font("Helvetica")
        .fontSize(9)
        .text(
          invoice.company || "",
          40,
          y + 42
        );

      doc.text(
        invoice.email || "",
        40,
        y + 56
      );

      doc.text(
        invoice.phone || "",
        40,
        y + 70
      );

      /* DETAILS */

      doc
        .fillColor(blue)
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(
          "DETAILS",
          390,
          y
        );

      doc
        .fillColor(dark)
        .font("Helvetica")
        .fontSize(9);

      doc.text(
        `Issue Date: ${
          invoice.issueDate || "-"
        }`,
        390,
        y + 20
      );

      doc.text(
        `Due Date: ${
          invoice.dueDate || "-"
        }`,
        390,
        y + 38
      );

      doc.text(
        `Status: ${
          invoice.status || "-"
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
        "SERVICE",
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

      /* ITEMS */

      let itemY = tableTop + 35;

      invoice.items.forEach(
        (item, index) => {
          const total =
            item.qty * item.price;

          /* ALTERNATING BG */

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
            item.service || "-",
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
            `$${item.price}`,
            405,
            itemY + 3
          );

          doc.text(
            `$${total}`,
            490,
            itemY + 3
          );

          itemY += 24;
        }
      );

      /* TOTAL BOX */

      const totalsY = itemY + 30;

      doc
        .roundedRect(
          345,
          totalsY,
          210,
          78,
          10
        )
        .stroke(border);

      doc
        .fillColor(light)
        .font("Helvetica")
        .fontSize(9);

      doc.text(
        "Subtotal",
        360,
        totalsY + 14
      );

      doc.text(
        `$${invoice.subtotal}`,
        500,
        totalsY + 14
      );

      doc.text(
        "Tax",
        360,
        totalsY + 34
      );

      doc.text(
        `$${invoice.tax}`,
        500,
        totalsY + 34
      );

      doc
        .fillColor(blue)
        .font("Helvetica-Bold")
        .fontSize(14);

      doc.text(
        "TOTAL",
        360,
        totalsY + 54
      );

      doc.text(
        `$${invoice.total}`,
        485,
        totalsY + 54
      );

      /* PAYMENT */

      const paymentY =
        totalsY + 120;

      doc
        .fillColor(blue)
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(
          "PAYMENT INFORMATION",
          40,
          paymentY
        );

      doc
        .fillColor(dark)
        .font("Helvetica")
        .fontSize(9);

      doc.text(
        `Method: ${
          invoice.paymentMethod ||
          "-"
        }`,
        40,
        paymentY + 20
      );

      doc.text(
        `Bank: ${
          invoice.bankName || "-"
        }`,
        40,
        paymentY + 36
      );

      doc.text(
        `Account Name: ${
          invoice.accountName ||
          "-"
        }`,
        40,
        paymentY + 52
      );

      doc.text(
        `Account Number: ${
          invoice.accountNumber ||
          "-"
        }`,
        40,
        paymentY + 68
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
          invoice.notes ||
            "Thank you for choosing NOVA Elite Systems.",
          320,
          paymentY + 20,
          {
            width: 220,
            lineGap: 2,
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
        .font("Helvetica-Oblique")
        .fontSize(16)
        .text(
          "Mirembe Joan",
          395,
          signY - 22
        );

      doc
        .fillColor(light)
        .font("Helvetica")
        .fontSize(8)
        .text(
          "Sales Manager",
          430,
          signY + 8
        );

      /* FOOTER */

      doc
        .font("Helvetica")
        .fontSize(8)
        .fillColor("#94a3b8")
        .text(
          "NOVA Elite Systems • Premium Business Solutions",
          0,
          805,
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