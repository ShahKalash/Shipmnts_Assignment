const express = require("express");
const router = express.Router();

const {addFlight, updateFlight} = require("../controllers/flight");

router.route("/:flight_number/status").put(updateFlight);

module.exports = router;