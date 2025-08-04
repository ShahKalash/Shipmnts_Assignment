const express = require("express");
const router = express.Router();

const {addShipment} = require("../controllers/shipment");
const {addRoute} = require("../controllers/route");
const {addFlight, updateFlight} = require("../controllers/flight");
// const {getVenue, deleteVenue} = require("../controllers/venue");

// router.route("/tree").get(getVenue);
// // router.route("/testing").get(getAllLocationsTesting);
router.route("/create").post(addShipment);
router.route("/:shipment_number/hops/add").post(addRoute);
router.route("/:shipment_number/flights/add").post(addFlight);


// router.route("/delete_location/:location_code").delete(deleteVenue);

module.exports = router;