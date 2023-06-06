import mongoose from "mongoose";

export function dbConnection() {
  mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log("Error", err);
    });
}
