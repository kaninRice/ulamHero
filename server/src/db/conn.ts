import mongoose from "mongoose";
import DEFAULT_MONGO_URI from "./default-uri";

class Database {
    connect() {
        mongoose.connect(DEFAULT_MONGO_URI).then(() => {
            console.log('[server] Connected to MongoDB');
        });

        return;
    }

    close() {
        return mongoose.connection.close();
    }
}

const database = new Database();

export default database;

