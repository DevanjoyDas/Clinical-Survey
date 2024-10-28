import express from "express"
import cors from "cors"
import clinicalTrialsRoute from "./routes/clinicalTrials.routes.js"
import { connectDB } from "./utils/DBConnection.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(cors({
    origin: "*",
    // credentials:'true',
}))


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/api/analytics",clinicalTrialsRoute);
app.listen(PORT , ()=>{
    console.log(`App is running at port ${PORT}`);
})

export {app};