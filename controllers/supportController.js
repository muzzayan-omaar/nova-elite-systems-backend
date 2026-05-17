import SupportTicket from "../models/SupportTicket.js";

/* =========================
   CREATE SUPPORT TICKET
========================= */

export const createSupportTicket =
  async (req, res) => {
    try {
      const ticket =
        await SupportTicket.create(
          req.body
        );

      res.status(201).json(ticket);

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };

/* =========================
   GET ALL TICKETS
========================= */

export const getSupportTickets =
  async (req, res) => {
    try {
      const tickets =
        await SupportTicket.find()
          .sort({
            createdAt: -1,
          });

      res.json(tickets);

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };

/* =========================
   UPDATE TICKET STATUS
========================= */

export const updateSupportTicket =
  async (req, res) => {
    try {
      const ticket =
        await SupportTicket.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(ticket);

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };

/* =========================
   DELETE TICKET
========================= */

export const deleteSupportTicket =
  async (req, res) => {
    try {
      await SupportTicket.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Ticket deleted",
      });

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };