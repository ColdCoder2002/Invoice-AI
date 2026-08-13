import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)

        //* Connection events
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected!')
        })

        mongoose.connection.on('error', (err) => {
            console.error(`MongoDB error: ${err.message}`)
        })

    } catch (error) {
        console.log(`MongoDB connection Failed: ${error.message}`)

        // process.exit(1) - forcefully band karo
        process.exit(1)
    }
}



//* Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log('MongoDB connection closed - app is shutting down.')
})


export default connectDB