const mongoose = require("mongoose");
const shipment = require("./shipment");

const routeSchema = new mongoose.Schema({
    origin : {
        type : String
    },
    destination:{
        type:String,
    }
});


module.exports = mongoose.model('route', routeSchema);