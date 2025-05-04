const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB u lidh me sukses (lokalisht)");
  } catch (error) {
    console.error("❌ Gabim në lidhje me MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
