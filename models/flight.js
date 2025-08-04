const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    carrier:{
        type:String
    },
    from : {
        type : String
    },
    to:{
        type:String,
    },
    flight_number:{
        type : String
    },
    departure:
    {
        type:Date
    },
    arrival:{
        type : Date
    },
    status:{
        type : String,
        default:"in-transit"
    }
});


module.exports = mongoose.model('flight', flightSchema);