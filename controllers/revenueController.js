import Invoice from "../models/Invoice.js";

/* REVENUE ANALYTICS */

export const getRevenueAnalytics =
  async (req, res) => {
    try {
      const invoices =
        await Invoice.find();

      /* COUNTS */

      const totalInvoices =
        invoices.length;

      const paidInvoices =
        invoices.filter(
          (inv) =>
            inv.status === "Paid"
        );

      const pendingInvoices =
        invoices.filter(
          (inv) =>
            inv.status === "Pending"
        );

      const overdueInvoices =
        invoices.filter(
          (inv) =>
            inv.status === "Overdue"
        );

      const cancelledInvoices =
        invoices.filter(
          (inv) =>
            inv.status === "Cancelled"
        );

      /* TOTALS */

      const totalRevenue =
        paidInvoices.reduce(
          (acc, inv) =>
            acc + Number(inv.total || 0),
          0
        );

      const pendingRevenue =
        pendingInvoices.reduce(
          (acc, inv) =>
            acc + Number(inv.total || 0),
          0
        );

      const overdueRevenue =
        overdueInvoices.reduce(
          (acc, inv) =>
            acc + Number(inv.total || 0),
          0
        );

      /* MONTHLY REVENUE */

      const monthlyRevenue = {};

      paidInvoices.forEach((inv) => {
        const date = new Date(
          inv.issueDate
        );

        const month =
          date.toLocaleString(
            "default",
            {
              month: "short",
            }
          );

        if (!monthlyRevenue[month]) {
          monthlyRevenue[month] = 0;
        }

        monthlyRevenue[month] +=
          Number(inv.total || 0);
      });

      const revenueChartData =
        Object.entries(
          monthlyRevenue
        ).map(([month, revenue]) => ({
          month,
          revenue,
        }));

      /* STATUS CHART */

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

        {
          name: "Cancelled",
          value:
            cancelledInvoices.length,
        },
      ];

      /* RESPONSE */

      res.json({
        totals: {
          totalInvoices,

          paidInvoices:
            paidInvoices.length,

          pendingInvoices:
            pendingInvoices.length,

          overdueInvoices:
            overdueInvoices.length,

          cancelledInvoices:
            cancelledInvoices.length,

          totalRevenue,

          pendingRevenue,

          overdueRevenue,
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