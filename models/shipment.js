const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
    origin : {
        type : String
    },
    destination:{
        type:String,
    },
    shipment_number:{
        type : String
    },
    hops:{
        type:[String]
    }
});


module.exports = mongoose.model('shipment', shipmentSchema);