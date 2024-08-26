import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.NODE_ENV === 'production' ? process.env.MONGOGB_URI : process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connection to Mongodb successful!");
  } catch (err) {
      console.error(err);
  }
}

connectDB();

export default mongoose;