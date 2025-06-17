import mongoose from "mongoose";
const connectDB=async()=>{
    mongoose.connection.on('connected',()=>console.log('Connected to DataBase'))
await mongoose.connect(`${process.env.MONGODB_URI}/LearnSphere`)
}
export default connectDB