"server-only";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";
const NODE_ENV = process.env.NODE_ENV || "";
const CLIENT = process.env.CLIENT || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

interface MongooseGlobal {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Prevent multiple connections in development (Hot Reloading issue)
declare global {
  var mongooseGlobal: MongooseGlobal;
}

let cached = global.mongooseGlobal || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.conn) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: `${CLIENT}-${NODE_ENV}`, // Replace with your DB name
      })
      .then((mongoose) => mongoose.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
