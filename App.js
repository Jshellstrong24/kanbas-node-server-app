import express from 'express';
import Hello from "./Hello.js"
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import session from "express-session";
import "dotenv/config";


const CONNECTION_STRING = 'mongodb+srv://giuseppi:supersecretpassword@cluster0.rdtw8pa.mongodb.net/kanbas?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(cors({
    credentials: true,
    origin: 'https://a6--quiet-banoffee-b41e15.netlify.app/'//'process.env.FRONTEND_URL'
}
));

const sessionOptions = {
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: 'kanbas-node-server-app-1-422p.onrender.com'//process.env.HTTP_SERVER_DOMAIN,
    };
  }
  

app.use(
    session(sessionOptions)
);
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app)
app.listen(process.env.PORT || 4000)