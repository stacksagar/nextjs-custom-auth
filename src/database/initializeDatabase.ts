import "@/database/models/User";
import dbconnection from "./dbconnection";

dbconnection
  .authenticate()
  .then(() => console.log("MySQL Database Connected."))
  .catch((error) =>
    console.log("ERROR::", error?.message || "Database Connection Error!")
  );

dbconnection.sync();
