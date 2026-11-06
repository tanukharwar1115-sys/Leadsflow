import mongoose from 'mongoose';
import { env } from '../../src/config/env.js';

// Each test file gets its own DB => parallel files never delete each other's data.
export async function connectTestDB(name) {
  await mongoose.connect(env.MONGODB_URI, { dbName: `technowib_leadflow_test_${name}`, serverSelectionTimeoutMS: 5000 });
}

export async function dropTestDB() {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
}
