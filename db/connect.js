const mongoose = require('mongoose');

const connectDB = ()=>{
    // console.log("DB connected!");
    return mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology : true,
    });
};

module.exports = connectDB;