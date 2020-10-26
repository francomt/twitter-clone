const mongoose = require("mongoose");

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

async function connect() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error(error);
  }
}

module.exports = connect;
