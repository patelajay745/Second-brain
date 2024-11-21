import { app } from "./app";
import dotenv from "dotenv";
import { connectDB } from "./db";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server ready on port ${process.env.PORT}`);
    });
  })
  .catch();

export default app;
