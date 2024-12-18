import { app } from "./app";
// import dotenv from "dotenv";
import { connectDB } from "./db";

// dotenv.config({ path: "./.env" });

const port = 8080;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server ready on port ${port}`);
    });
  })
  .catch();

export default app;
