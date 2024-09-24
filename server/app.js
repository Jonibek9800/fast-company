const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const initDataBase = require("./startUp/initDataBase");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

const PORT = config.get("port") ?? 8080;

// if (process.env.NODE_ENV === "production") {
//     console.log("productions");
// }
///BPuvfrgi2gY0s3QV mongo pass
/// neo501166180 mongo name

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDataBase();
    });
    await mongoose.connect(config.get("mongoUri"));
    app.listen(PORT, () =>
      console.log(chalk.green(`server has been started on port ${PORT}...`))
    );
  } catch (error) {
    console.log(chalk.red(error.message));
  }
}

start();
