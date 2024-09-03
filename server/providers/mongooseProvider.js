import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// Establish connection to MongoDB
export default () => {
	mongoose.connect(process.env.MONGO_LOCAL_BASE_URL)
	.then(() => console.log('Mongo Connection Established'))
	.catch(error => console.error(error));

};
