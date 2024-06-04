import mongoose from "mongoose";
import config from "config";

const dbConnect = async () => {
    try {
        await mongoose.connect(config.get("DB_URL"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB Connected Successfully 🚀");
    } catch (error) {
        console.log("DB Connection Error: ", error);
        process.exit(1); // Exit process with failure
    }
};

export default dbConnect;
