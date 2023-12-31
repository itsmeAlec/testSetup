const path = require("path");
const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const rootRoutes = require("./routes/root");

const app = express();
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "backend", "static"));
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLiveReload());
}

const authRoutes = requires("./routes/authentication");
const landingRoutes = requires("./routes/landing");
const globalLobbyRoutes = requires("./routes/global_lobby");
const gameRoutes = requires("./routes/games");
app.use("/auth", authRoutes);

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// app.use(express.static(path.join(__dirname, "static")));

// app.use("/", rootRoutes);

app.use((_request, _response, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
