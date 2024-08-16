const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://Zareesha:zareesha123@cluster0.kkb4bos.mongodb.net/BudgetTracker"
    );
    console.log(`Connected to MongoDb database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDb ${error}`);
  }
};

module.exports = connectDb;
