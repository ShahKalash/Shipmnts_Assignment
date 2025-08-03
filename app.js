require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

// const venue_routes = require("./routes/venue");

app.use(express.json()); 
app.get("/", (req, res) => {
    res.send("Live");
});

//middleware
// app.use("/api/", venue_routes);
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