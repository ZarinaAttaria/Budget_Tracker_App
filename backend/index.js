const express = require("express");
const connectDb = require("./db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const app = express();

connectDb();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
