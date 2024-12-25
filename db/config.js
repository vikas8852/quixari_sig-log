const mongoose=require('mongoose');
const connectDB = async () => {
    try {
     
      const connectionInstance = await mongoose.connect('mongodb://127.0.0.1:27017/login')
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection Error ", error);
        process.exit(1)
    }

} 


module.exports =connectDB;