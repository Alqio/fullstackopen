const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const url = process.env.DB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("Connected to Mongo")
    }).catch(err => {
        console.log("Failed to connect to Mongo, error:", err)
    })


const phoneNumberSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        unique: true
    },
    number: {
        type: String,
        minlength: 8
    }
})

phoneNumberSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("PhoneNumber", phoneNumberSchema)
