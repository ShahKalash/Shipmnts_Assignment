const Shipment = require("../models/shipment");
const Route = require("../models/route");
const Flight = require("../models/flight");
// // const Transaction = require("../models/transaction");


// const getVenueTesting = async (req, res) =>{
//     const filteredData = await Venue.find(req.query);
//     res.status(200).json(filteredData);
// };

const addFlight = async (req, res) =>{
    console.log(req.body);
    let {carrier,from, to, flight_number, departure, arrival} = req.body;
    let {shipment_number} = req.params;
    const r = await Route.findOne({origin : from, destination : to});
    if (!r)
    {
        res.status(400).json({success : false, message : "Unable to add a flight. The 'from' and 'to' locations are not consecutive hops for this shipment."});
        return;
    }

    await Flight.create(req.body);
    let text1 = from;
    text1 = text1.concat("-");
    text1 = text1.concat(carrier);
    text1 = text1.concat("-");
    text1 = text1.concat(to);
    const flight = await Flight.findOne({flight_number : flight_number});
    console.log(flight);
    res.status(201).json({success : true , message : "Flight information added successfully.", data:{
        shipment_number:shipment_number,
        flight_number : flight.flight_number,
        flight_path : text1,
        departure : flight.departure,
        arrival : flight.arrival,
        status : flight.status
    }});


};

const updateFlight = async(req,res)=>{
    console.log("reached");
    const {flight_number} = req.params;
    const {status} = req.body;
    console.log(flight_number);
    const flight = await Flight.findOne({flight_number: flight_number});
    console.log(flight);
    let msg = "Flight with ID '";
    msg = msg.concat(flight_number);
    msg = msg.concat("' not found");
    if (flight)
    {
        flight.status = status;
        await flight.save();
        res.status(200).json({success : true , message : "Flight status updated successfully.", data:
            {
                flight_number : flight_number,
                status:status
            }
        });
        return;
    }
    res.status(400).json({success : false , message : msg});

};

module.exports = {addFlight, updateFlight};

