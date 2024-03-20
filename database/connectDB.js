import { connect } from 'mongoose';
import DB_NAME from '../constants.js';

const connectDB = async () => {
  try {
    const connectionObject = await connect(
      `${process.env.MONGO_URL}${DB_NAME}`
    );
    console.log(`DB Is Successfully Connected.`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};


export default connectDB;
