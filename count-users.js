const mongoose = require('mongoose');

const DB_URL = 'mongodb://root:GXkg9RvCMEYOw7nY@arogyaa-shard-00-00.l0qed.mongodb.net:27017,arogyaa-shard-00-01.l0qed.mongodb.net:27017,arogyaa-shard-00-02.l0qed.mongodb.net:27017/qubi-ride?ssl=true&replicaSet=atlas-2n9twv-shard-0&authSource=admin&retryWrites=true&w=majority';

async function countUsers() {
  try {
    console.log('Connecting to exact Replica Set URL...');
    await mongoose.connect(DB_URL);
    const db = mongoose.connection.db;
    
    const usersCount = await db.collection('users').countDocuments();
    const passengersCount = await db.collection('passengers').countDocuments();
    const driversCount = await db.collection('drivers').countDocuments();
    
    console.log(`\n\n--- SUCCESS ---`);
    console.log(`Users count: ${usersCount}`);
    console.log(`Passengers count: ${passengersCount}`);
    console.log(`Drivers count: ${driversCount}`);
    
  } catch (err) {
    console.error('Failed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

countUsers();
