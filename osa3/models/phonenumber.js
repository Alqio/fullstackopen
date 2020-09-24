const mongoose = require('mongoose');


const url = process.env.DB_URI;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log("Connected to Mongo");
    }).catch(err => {
        console.log("Failed to connect to Mongo, error:", err);
    });


const phoneNumberSchema = new mongoose.Schema({
    name: String,
    number: String
});

phoneNumberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('PhoneNumber', phoneNumberSchema);
