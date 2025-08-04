require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 3000;

const shipment_routes = require("./routes/shipment");
const flight_routes = require("./routes/flight");

app.use(express.json()); 
app.get("/", (req, res) => {
    res.send("Live");
});

//middleware
app.use("/shipments", shipment_routes);
app.use("/flight", flight_routes);
// app.use("/api/venue/", venue_routes);


const start = async() =>{
    try {
        await connectDB();
        app.listen(PORT, ()=>{
            console.log(`Port ${PORT} Connected!`);
        })
    } catch (error) {
        console.log(error);
    }
};

start();