// const Venue = require("../models/venue");
// // const Transaction = require("../models/transaction");

// const getVenue = async (req, res) =>{
//     const filteredData = await Venue.findOne(req.query);
//     console.log(req.query);
//     if (!filteredData)
//     {
//         res.status(400).json({msg : "Location Not found!"});
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

// const addVenue = async (req, res) =>{
//     console.log(req.body);
//     let {location_code,parent_location_code} = req.body;
//     console.log(location_code);
//     if (!parent_location_code)
//         await Venue.create({location_code : location_code, type:"venue", parent_location_code : null});
//     else
//     {
//         const item = await Venue.findOne({location_code : parent_location_code});
//         if (!item)
//         {
//             res.status(400).json({msg : "Parent Not found!"});
//         }
//         await Venue.create({location_code: location_code, type : "room", parent_location_code:parent_location_code});
//     }
//     res.status(200).json({msg : "success"});
// };
// const deleteVenue = async (req, res) =>{
//     console.log(req.params);
//     let {location_code} = req.params;
//     console.log(location_code);
//     await Venue.deleteOne({location_code : location_code});
//     res.status(200).json({msg : "success"});
// };

// module.exports = {getVenue, getVenueTesting, addVenue, deleteVenue};

