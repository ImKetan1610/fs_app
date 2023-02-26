const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://Ketan:Ketan1610@cluster0.rwvk47z.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

let user = new User({
  username: "Renuka",
  password: "12345",
});

user.save((error) => {
  if (error) throw error;
  console.log("New user has been saved to database successfully!");
});

app.get("/", (req, res) => {
  res.send("welcome to my game app!");
});

app.post("/", (req, res) => {
  const { username, password } = req.body;
  const user = new User({
    username,
    password,
  });
  user.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send("User saved to database");
    }
  });
});

app.listen(3000, () => {
  console.log("Express server started on port 3000");
});
