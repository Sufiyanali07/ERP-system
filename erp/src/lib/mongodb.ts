import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/next_erp'

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables')
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

console.log('🔧 MongoDB URI configured:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')) // Hide credentials in logs

let cached = global.mongoose

if (!cached) {
  console.log('🚀 Initializing MongoDB connection cache')
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    console.log('✅ Using cached MongoDB connection')
    return cached.conn
  }

  if (!cached.promise) {
    console.log('🔄 Creating new MongoDB connection...')
    
    const opts = {
      bufferCommands: false,
    }

    // Add connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully')
    })

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected')
    })

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected')
    })

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('🎉 MongoDB connection established successfully')
      console.log('📊 Connection state:', mongoose.connection.readyState)
      console.log('🏷️ Database name:', mongoose.connection.name)
      return mongoose.connection
    })
  }

  try {
    console.log('⏳ Waiting for MongoDB connection...')
    cached.conn = await cached.promise
    console.log('✅ MongoDB connection ready for use')
  } catch (e) {
    console.error('❌ Failed to connect to MongoDB:', e)
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
