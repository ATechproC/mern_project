const mongoose = require("mongoose");

const dbConnect = () => {
    return mongoose
        .connect(`${process.env.MONGO_URI}/prescripto`, {
            serverSelectionTimeoutMS: 5000,
        })
        .then((conn) => {
            console.log(`Database Connected: ${conn.connection.host}`);
            return conn;
        })
        .catch((err) => {
            console.error(`Database Connection Error: ${err.message}`);
            process.exit(1);
        });
};

module.exports = dbConnect;