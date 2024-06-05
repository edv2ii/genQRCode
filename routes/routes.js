const router = require("express").Router()
const generateQR = require("../controllers/generateQR.controller")

exports.home = router.post("/", (req, res) => generateQR(req, res))
