import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export const sendSupportReply =
  async (req, res) => {
    try {

      const {
        to,
        subject,
        message,
      } = req.body;

      const data =
        await resend.emails.send({
          from:
            "NOVA Support <onboarding@resend.dev>",

          to,

          subject,

          html: `
            <div style="
              font-family: Arial;
              line-height: 1.7;
            ">

              ${message}

            </div>
          `,
        });

      res.json(data);

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };