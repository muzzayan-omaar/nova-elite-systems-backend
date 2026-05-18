import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";

/* =========================
   LOGIN
========================= */

export const loginAdmin =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      /* FIND ADMIN */

      const admin =
        await Admin.findOne({
          email,
        });

      if (!admin) {

        return res
          .status(401)
          .json({
            message:
              "Invalid credentials",
          });
      }

      /* CHECK PASSWORD */

      const isMatch =
        await bcrypt.compare(
          password,
          admin.password
        );

      if (!isMatch) {

        return res
          .status(401)
          .json({
            message:
              "Invalid credentials",
          });
      }

      /* TOKEN */

      const token =
        jwt.sign(
          {
            id: admin._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

      res.json({
        token,

        admin: {
          id: admin._id,
          email:
            admin.email,
          name:
            admin.name,
        },
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });
    }
  };