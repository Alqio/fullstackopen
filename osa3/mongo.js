const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('usage: password name phone-number as argument');
    process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://mongo-user:${password}@main.mc35x.mongodb.net/main?retryWrites=true&w=majority`;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});


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

