const moongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    const connectDB = await moongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB connected: ${connectDB.connection.host}`.cyan.underline.bold)
  } catch (error) {
    console.log(`ERROR ===> ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectMongoDB