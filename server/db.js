const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`connected to db successfully`);
    } catch (error) {
        console.log(`cannot connect to db`);
    }
};
