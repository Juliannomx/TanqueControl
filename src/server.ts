import config from "./config/config";
import connectToMongo from "./config/database";
import app from "./app";

connectToMongo();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
