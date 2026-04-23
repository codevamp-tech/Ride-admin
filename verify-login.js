const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const DB_URL = 'mongodb://root:GXkg9RvCMEYOw7nY@arogyaa-shard-00-00.l0qed.mongodb.net:27017,arogyaa-shard-00-01.l0qed.mongodb.net:27017,arogyaa-shard-00-02.l0qed.mongodb.net:27017/qubi-ride?ssl=true&replicaSet=atlas-2n9twv-shard-0&authSource=admin&retryWrites=true&w=majority';

async function verifyLogin() {
  try {
    await mongoose.connect(DB_URL);
    const db = mongoose.connection.db;
    
    const user = await db.collection('users').findOne({ email: 'oscodesoftware@gmail.com' });
    if (!user) {
      console.log('User not found!');
      return;
    }
    
    console.log('User found:', user.email);
    console.log('Hashed Password in DB:', user.password);
    
    const isValid = await bcrypt.compare('Password123!', user.password);
    console.log('Password valid?:', isValid);
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

verifyLogin();
