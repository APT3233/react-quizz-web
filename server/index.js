import express from "express";
import RouterApi from "./route/index.js";
import RouterUser from "./route/info/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

var port = 4444;
const args = process.argv.slice(2);
if (args[0] === "-p") port = parseInt(args[1]);

app.use("/api", RouterApi);
app.use("/user", RouterUser);

const server = app.listen(port, "127.0.0.1", function () {
  const { address: host, port } = server.address();
  console.log("Server listening at http://%s:%s", host, port);
});
