import mongoose from "mongoose";
import { DB_NAME } from "../constants";

export const connectDB = async () => {
  try {
    const URL = `${process.env.MONGODB_URI}`;

    //console.log("URl", URL);

    const connectionInstance = await mongoose.connect(URL);

    console.log("mongoDB connected  ", connectionInstance.connection.name);
  } catch (error) {
    console.log("Mongodb connextion error", error);
  }
};
