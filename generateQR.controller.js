const QRCode = require("qrcode")
const generatePayload = require("promptpay-qr")
const bodyParser = require("body-parser")
const _ = require("lodash")
require("dotenv").config()


const generateQR = (req, res) => {
  const amount = parseFloat(_.get(req, ["body", "amount"]));
  if (isNaN(amount)) {
    console.error("Invalid amount:", req.body.amount);
    // Handle the error appropriately, maybe send an error response to the client
  } else {
    console.log("Parsed amount:", amount);
  }
  const mobileNumber = process.env.PROMPT_PAY
  const payload = generatePayload(mobileNumber, { amount });
  const option = {
    color: {
      dark: "#000",
      light: "#fff",
    },
  };
  QRCode.toDataURL(payload, option, (err, url) => {
    if (err) {
      console.log("generate fail");
      return res.status(400).json({
        respCode: 400,
        RespMessage: "bad: " + err,
      });
    } else {
      return res.status(200).json({
        RespCode: 200,
        RespMessage: "good",
        Result: url,
      });
    }
  });
};

module.exports = generateQR;
