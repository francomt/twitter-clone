require("dotenv").config({ path: "./config.env" });

const dbConnect = require("./server/db/db");

//CONNECT TO DATABASE
dbConnect();

const app = require("./server/index");

//start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🤖 Listening on port ${port}`);
});
