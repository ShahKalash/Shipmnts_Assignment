const express = require("express");
const router = express.Router();

const {addFlight, updateFlight} = require("../controllers/flight");
// const {getVenue, deleteVenue} = require("../controllers/venue");

// router.route("/tree").get(getVenue);
// // router.route("/testing").get(getAllLocationsTesting);
router.route("/:flight_number/status").put(updateFlight);


// router.route("/delete_location/:location_code").delete(deleteVenue);

module.exports = router;