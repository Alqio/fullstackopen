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

const PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema);

if (process.argv.length === 3) {
    PhoneNumber.find({}).then(result => {
        result.forEach(phoneNumber => {
            console.log(phoneNumber.name, phoneNumber.number);
        });

        mongoose.connection.close()
    });
} else {
    const name = process.argv[3];
    const number = process.argv[4];

    const phoneNumber = new PhoneNumber({
        name,
        number
    });

    phoneNumber.save().then(response => {
        console.log('added', name, number, "to phonebook");
        mongoose.connection.close()
    });
}

