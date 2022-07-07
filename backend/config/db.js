import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect("mongodb://mongodb:27017/festival", {
    // const conn = await mongoose.connect(`${process.env.MONGO_URI}`, {
    const conn = await mongoose.connect("mongodb://localhost:27017/festival", {
      //https://stackoverflow.com/questions/34711642/docker-mongo-image-connection-refused-from-other-container
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
