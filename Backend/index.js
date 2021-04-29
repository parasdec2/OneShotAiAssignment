require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const studentRoutes = require("./routes/student");
const collegeRoutes = require("./routes/college");

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED!");
  })
  .catch((err) => console.error("DB NOT CONNECTED", err));

app.use(express.json());
app.use(cors());

app.use("/api", collegeRoutes);
app.use("/api", studentRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`App is running on port ${port}`));
