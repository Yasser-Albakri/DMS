const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const AppError = require("./utils/appError");
const cardsRouter = require("./routes/accountCardRoutes");
const userRoutes = require("./routes/userRoutes");
const attachedDocRoutes = require("./routes/attachedDocRoutes");
const outGoingRoutes = require("./routes/outGoingRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const QrCodeRoutes = require("./routes/QrCodeRoutes");
const generalRoutes = require("./routes/generalRoutes");
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOW-FROM http://127.0.0.1:4000");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/users", userRoutes);
app.use("/cards", cardsRouter);
app.use("/attached", attachedDocRoutes);
app.use("/income", incomeRoutes);
app.use("/outgoing", outGoingRoutes);
app.use("/generateQR", QrCodeRoutes);
app.use("/general", generalRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
