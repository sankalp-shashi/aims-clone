// Database connection configuration
import mongoose from "mongoose";
import dotenv from "dotenv";
// import path from "path";

dotenv.config({ path: '../.env' });
const connection = async () => {
  try {
   const MONGO_URI = process.env.MONGO_URI;
    // const MONGO_URI = "mongodb+srv://2022csb1137:tuffy727@oj-db.l1r1a.mongodb.net/?retryWrites=true&w=majority&appName=oj-db"

    await mongoose.connect(MONGO_URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error while connecting to the Database: ', error.message);
    process.exit(1);
  }
}

export default connection;
