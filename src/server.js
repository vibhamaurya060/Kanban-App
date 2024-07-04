const express = require("express");
const connectToDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const tasks = require("./routes/tasks");
const auth = require("./middlewares/auth");
const MongoStore = require("connect-mongo");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 9090;
const db_url = process.env.DB_URI;


const app = express();
app.use(cors({origin:process.env.FRONTEND_URL, credentials:true}));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: db_url }),
    cookie: {
      // secure: true,
      httpOnly: true,
    },
  })
);

app.get("/", (req, res) => {
  res.send("this is a home route");
});
app.use("/user", userRouter);
app.use('/api/tasks', auth, tasks)

app.listen(port, async () => {
  try {
    await connectToDB(db_url);
    console.log(`server is running at ${port}`);
    console.log("connect to database");
  } catch (err) {
    console.log(err);
  }
});
