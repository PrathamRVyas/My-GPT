import "dotenv/config";
import dns from "dns";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());


app.use("/api", chatRoutes);



const connectDB = async() =>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!")
  }catch(err){
    console.log("failed to connect with the db", err);
    process.exit(1);
  }
};

await connectDB();

app.listen(PORT, () =>{
  console.log(`server running on port ${PORT}`);
});
