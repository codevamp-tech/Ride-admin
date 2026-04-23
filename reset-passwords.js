const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const DB_URL = 'mongodb://root:GXkg9RvCMEYOw7nY@arogyaa-shard-00-00.l0qed.mongodb.net:27017,arogyaa-shard-00-01.l0qed.mongodb.net:27017,arogyaa-shard-00-02.l0qed.mongodb.net:27017/qubi-ride?ssl=true&replicaSet=atlas-2n9twv-shard-0&authSource=admin&retryWrites=true&w=majority';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function resetPasswords() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(DB_URL);
    
    const users = await User.find({});
    console.log(`Found ${users.length} users.`);
    
    const newPasswordRaw = 'Password123!';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPasswordRaw, salt);
    
    console.log('\n--- Updating Passwords ---');
    for (const user of users) {
      user.password = hashedPassword;
      await user.save();
      console.log(`Updated user: ${user.email} (Role: ${user.role})`);
    }
    
    console.log(`\nAll user passwords have been reset to: ${newPasswordRaw}`);
    
  } catch (err) {
    console.error('Failed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

resetPasswords();
