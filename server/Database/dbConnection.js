const { default: mongoose } = require("mongoose");

mongoose.connect(process.env.dbURL)
    .then((result) => {
        console.log("Connected to Database");        
    })
    .catch((err) => {
        console.log("Error in connecting to Database");
    });