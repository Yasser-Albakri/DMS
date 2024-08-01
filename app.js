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
const branchRoutes = require("./routes/branchRoutes");
const subBranchRoutes = require("./routes/subBranchRoutes");
const permitsRoutes = require("./routes/permitsRoutes");
const renewalRoutes = require("./routes/renewalRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");

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
app.use("/", limiter);
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
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
app.use("/branch", branchRoutes);
app.use("/subBranch", subBranchRoutes);
app.use("/permits", permitsRoutes);
app.use("/renewal", renewalRoutes);
app.use("/statistics", statisticsRoutes);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
