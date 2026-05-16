import Invoice from "../models/Invoice.js";

export const getRevenueAnalytics =
  async (req, res) => {
    try {
      const {
        from,
        to,
        status,
        client,
      } = req.query;

      /* FILTER OBJECT */

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

      /* FETCH */

      const invoices =
        await Invoice.find(filter);

      /* TOTALS */

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

      const totalRevenue =
        paidInvoices.reduce(
          (acc, item) =>
            acc + item.total,
          0
        );

      const pendingRevenue =
        pendingInvoices.reduce(
          (acc, item) =>
            acc + item.total,
          0
        );

      const overdueRevenue =
        overdueInvoices.reduce(
          (acc, item) =>
            acc + item.total,
          0
        );

      /* MONTHLY CHART */

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
            invoice.total;
        }
      );

      const revenueChartData =
        Object.entries(monthlyMap).map(
          ([month, revenue]) => ({
            month,
            revenue,
          })
        );

      /* PIE CHART */

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

      res.json({
        totals: {
          totalRevenue,
          pendingRevenue,
          overdueRevenue,

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