const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/bhasmeji";

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connectedd to mongo successfully");
    })
}

module.exports = connectToMongo;