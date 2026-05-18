import Consultation from "../models/Consultation.js";

/* =========================
   CREATE CONSULTATION
========================= */

export const createConsultation =
  async (req, res) => {

    try {

      const consultation =
        await Consultation.create(
          req.body
        );

      res.status(201).json(
        consultation
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });
    }
  };

/* =========================
   GET CONSULTATIONS
========================= */

export const getConsultations =
  async (req, res) => {

    try {

      const consultations =
        await Consultation.find()
          .sort({
            createdAt: -1,
          });

      res.json(
        consultations
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });
    }
  };

/* =========================
   UPDATE STATUS
========================= */

export const updateConsultationStatus =
  async (req, res) => {

    try {

      const consultation =
        await Consultation.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            new: true,
          }
        );

      res.json(
        consultation
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });
    }
  };

/* =========================
   DELETE CONSULTATION
========================= */

export const deleteConsultation =
  async (req, res) => {

    try {

      await Consultation.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Consultation deleted",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });
    }
  };