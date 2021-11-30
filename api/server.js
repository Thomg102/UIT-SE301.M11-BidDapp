const dotenv = require("dotenv");
const app = require("./app");

const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose
  .connect(DB, {
    useCreateIndex: true,
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));
  
app.listen(port, () => {
  console.log(`App running on port ${port}`);
}); // start the server