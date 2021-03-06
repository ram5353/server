const express = require("express");
const cors = require("cors");

var app = express();
app.use(cors());
app.use(express.json());
global.__basedir = __dirname;

app.get("/test", (req, res) => {
  res.send("<h1>It's working 🤗</h1>")
})

const authenticateUserRouter = require("./routes/authenticateUser");
const createNewUserRouter = require("./routes/createNewUser");
const sampleDataSetRouter = require("./routes/sampleDataSetRouter");
const csvFilesUploadRouter = require("./routes/csvFileUploader");
const fetchDataSetNamesRouter = require("./routes/fetchDataSetNamesRouter");

app.use("/authenticateUser", authenticateUserRouter);
app.use("/newuser", createNewUserRouter);
app.use("/fetchData", sampleDataSetRouter);
app.use("/csvupload", csvFilesUploadRouter);
app.use("/fetchDataSetNames", fetchDataSetNamesRouter);

var server = app.listen(8080, () => {
  console.log("Server Listening on Port 8080");
});

//Error Handling statements
function handleTermination(signal) {
  // If a termination signal is received.
  console.info("\n" + signal);
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    process.exit(1);
  });
}
process.on("SIGTERM", handleTermination);
process.on("SIGINT", handleTermination);
process.on("uncaughtException", handleTermination);
