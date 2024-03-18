const mongoose = require('mongoose');
const DB_NAME = require('../constants.js');

const connectDB = async () => {
  try {
    const connectionObject = await mongoose.connect(
      `${process.env.MONGO_URL}${DB_NAME}`
    );
    console.log(`DB Is Successfully Connected.`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
