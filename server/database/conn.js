import mongoose from "mongoose";

async function connect(){

    try {

        mongoose.set('strictQuery', true);

        const db = await mongoose.connect(process.env.DATABASE_URL);

        console.log("Database Connected");

        return db;

    } catch(error) {

        console.log("Database connection error:", error);
        process.exit(1);

    }
}

export default connect;