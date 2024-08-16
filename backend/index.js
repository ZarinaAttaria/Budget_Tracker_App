const express = require("express");
const connectDb = require("./db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = 3000;

connectDb();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
