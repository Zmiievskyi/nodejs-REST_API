const app = require("./app");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;
mongoose.set("strictQuery", true);
const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(
        `Database connection successful.`
      );
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
