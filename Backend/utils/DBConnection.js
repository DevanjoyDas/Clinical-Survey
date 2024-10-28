import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(MONGODB_URI);
        console.log(`Database Connected`)
    
    } catch (error) {
        console.log(`DB Connection Error : ${error}`);
        process.exit(1);
    }
}

export {connectDB}