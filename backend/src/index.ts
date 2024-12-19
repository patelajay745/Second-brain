import "./config";
import { app } from "./app";
import { connectDB } from "./db";

const port = 8080;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server ready on port ${port}`);
    });
  })
  .catch();

export default app;
