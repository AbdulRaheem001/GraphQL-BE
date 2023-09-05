const mongoose = require('mongoose');
const mongoosURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASWORD}@fypwork.gdjjuvu.mongodb.net/test?retryWrites=true`;

const dbConnection = async () => {
    const conn = await mongoose.createConnection(mongoosURL);
    };
module.exports = dbConnection;