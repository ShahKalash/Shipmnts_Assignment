const Shipment = require("../models/shipment");
const Route = require("../models/route");
const flight = require("../models/flight");
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

const addRoute = async (req, res) =>{
    console.log(req.body);
    const {shipment_number} = req.params;
    let {previous_hop,next_hop, new_hop} = req.body;
    let r = await Route.findOne({origin : previous_hop, destination : next_hop});
    if (!r)
    {
        res.status(400).json({success : false, message : "No consecutive hops"});
        return;
    }
    await Route.deleteOne({origin : previous_hop, destination : next_hop});
    let shipment = Shipment.findOne({shipment_number : shipment_number});
    Route.create({origin:previous_hop, destination:new_hop});
    Route.create({origin:new_hop, destination:next_hop});
    const ship = await Shipment.findOne({shipment_number : shipment_number});
    if (!ship)
    {
        res.status(400).json({success : false, message : "Shipment with Id not found"});
        return;
    }
    const arr = [];
    for (let hop of ship.hops)
    {
        arr.push(hop);
        if (hop == previous_hop)
            arr.push(new_hop);
    }
    ship.hops = arr;
    await ship.save();
    res.status(200).json({success : true , message : "Hop added successfully.", data:{
        shipment_number:ship.shipment_number,
        hops : ship.hops
    }});


};

const trackFlight = async (req, res) =>{
    const {shipment_number} = req.params;
    const ship = await Shipment.findOne({shipment_number : shipment_number});
    if (!ship)
    {
        res.status(400).json({success : false , message : "Shipment with ID not found"});
        return;
    }
    let prog = 0;
    let tot = 0;
    for (let i = 0; i<ship.hops.length-1; i++)
    {
        let from = ship.hops[i];
        let to = ship.hops[i+1];
        let flight = await flight.findOne({from:from, to:to});
        if (flight.status === "landed")
            prog++;
    }
    prog = prog / (ship.hops.length-1);
    prog= prog*100;
    res.status(200).json({success : true , message : "Shipment tracking details retrieved.", progress: prog});

};

// const deleteVenue = async (req, res) =>{
//     console.log(req.params);
//     let {location_code} = req.params;
//     console.log(location_code);
//     await Venue.deleteOne({location_code : location_code});
//     res.status(200).json({message : "success"});
// };

module.exports = {addRoute, trackFlight};

