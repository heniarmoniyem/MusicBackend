const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.BD_CONNECTION_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongoose Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
