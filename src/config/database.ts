import { connect } from "mongoose";
import config from "./config";

const connectToMongo = async () => {
  return connect(config.mongoUri)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.log(`Can't Connect to MongoDB: ${err}`));
};

export default connectToMongo;
