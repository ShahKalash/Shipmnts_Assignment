const Shipment = require("../models/shipment");
const Route = require("../models/route");
// // const Transaction = require("../models/transaction");

// const getVenue = async (req, res) =>{
//     const filteredData = await Venue.findOne(req.query);
//     console.log(req.query);
//     if (!filteredData)
//     {
//         res.status(400).json({message : "Location Not found!"});
//     }
    
//     let obj1 = (req.query);
//     let obj2 = ({"type" : filteredData.type});
//     const children = [];
//     const data = await Venue.find({parent_location_code : filteredData.location_code});
//     for (c of data)
//     {
//         children.push({"location_code" : c.location_code, "type" : c.type, "childs" : c.children});
//     }
//     console.log(children);
//     Object.assign(obj1, obj2);
//     Object.assign(obj1, {"children" : children});
//     res.status(200).json(obj1);
// };

// const getVenueTesting = async (req, res) =>{
//     const filteredData = await Venue.find(req.query);
//     res.status(200).json(filteredData);
// };

const addShipment = async (req, res) =>{
    console.log(req.body);
    let {origin,destination, shipment_number} = req.body;
    if (!origin || !destination)
    {
        res.status(400).json({success : false, message : "Origin and destination are required fields."});
        return;
    }
    const ship = await Shipment.findOne({shipment_number : shipment_number});
    console.log(ship);
    if (ship != null)
    {
        res.status(400).json({success : false , message : "Shipment Number already exists"});
        return;
    }
    Route.create({origin : origin, destination: destination});
    Shipment.create({origin : origin, destination:destination,shipment_number:shipment_number, hops : [origin, destination]});
    res.status(200).json({success : true, message : "shipment created successfully.", data : {shipment_number: shipment_number,
            hops: [origin, destination]
    }});


};
// const deleteVenue = async (req, res) =>{
//     console.log(req.params);
//     let {location_code} = req.params;
//     console.log(location_code);
//     await Venue.deleteOne({location_code : location_code});
//     res.status(200).json({message : "success"});
// };

module.exports = {addShipment};

