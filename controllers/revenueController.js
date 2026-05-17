import Invoice from "../models/Invoice.js";
import Expense from "../models/Expense.js";

export const getRevenueAnalytics =
  async (req, res) => {
    try {
      const {
        from,
        to,
        status,
        client,
      } = req.query;

      /* =========================
         FILTER OBJECT
      ========================= */

      let filter = {};

      /* DATE FILTER */

      if (from || to) {
        filter.issueDate = {};

        if (from) {
          filter.issueDate.$gte = from;
        }

        if (to) {
          filter.issueDate.$lte = to;
        }
      }

      /* STATUS FILTER */

      if (status && status !== "All") {
        filter.status = status;
      }

      /* CLIENT FILTER */

      if (client) {
        filter.clientName = {
          $regex: client,
          $options: "i",
        };
      }

      /* =========================
         FETCH DATA
      ========================= */

      const invoices =
        await Invoice.find(filter);

      const expenses =
        await Expense.find();

      /* =========================
         INVOICE GROUPS
      ========================= */

      const paidInvoices =
        invoices.filter(
          (i) =>
            i.status === "Paid"
        );

      const pendingInvoices =
        invoices.filter(
          (i) =>
            i.status === "Pending"
        );

      const overdueInvoices =
        invoices.filter(
          (i) =>
            i.status === "Overdue"
        );

      /* =========================
         REVENUE CALCULATIONS
      ========================= */

      const grossRevenue =
        paidInvoices.reduce(
          (acc, item) =>
            acc + Number(item.total || 0),
          0
        );

      const pendingRevenue =
        pendingInvoices.reduce(
          (acc, item) =>
            acc + Number(item.total || 0),
          0
        );

      const overdueRevenue =
        overdueInvoices.reduce(
          (acc, item) =>
            acc + Number(item.total || 0),
          0
        );

      /* =========================
         EXPENSE CALCULATIONS
      ========================= */

      const totalExpenses =
        expenses.reduce(
          (acc, item) =>
            acc +
            Number(item.amount || 0),
          0
        );

      /* =========================
         NET PROFIT
      ========================= */

      const netProfit =
        grossRevenue -
        totalExpenses;

      /* =========================
         BURN RATE
      ========================= */

      const monthlyBurnRate =
        totalExpenses / 12;

      /* =========================
         MONTHLY REVENUE CHART
      ========================= */

      const monthlyMap = {};

      paidInvoices.forEach(
        (invoice) => {
          const date = new Date(
            invoice.issueDate
          );

          const month =
            date.toLocaleString(
              "default",
              {
                month: "short",
              }
            );

          if (!monthlyMap[month]) {
            monthlyMap[month] = 0;
          }

          monthlyMap[month] +=
            Number(invoice.total || 0);
        }
      );

      const revenueChartData =
        Object.entries(monthlyMap).map(
          ([month, revenue]) => ({
            month,
            revenue,
          })
        );

      /* =========================
         STATUS PIE CHART
      ========================= */

      const invoiceStatusData = [
        {
          name: "Paid",
          value:
            paidInvoices.length,
        },

        {
          name: "Pending",
          value:
            pendingInvoices.length,
        },

        {
          name: "Overdue",
          value:
            overdueInvoices.length,
        },
      ];

      /* =========================
         RESPONSE
      ========================= */

      res.json({
        totals: {
          grossRevenue,
          pendingRevenue,
          overdueRevenue,

          totalExpenses,

          netProfit,

          monthlyBurnRate,

          paidInvoices:
            paidInvoices.length,

          pendingInvoices:
            pendingInvoices.length,

          overdueInvoices:
            overdueInvoices.length,

          totalInvoices:
            invoices.length,
        },

        revenueChartData,

        invoiceStatusData,
      });

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };