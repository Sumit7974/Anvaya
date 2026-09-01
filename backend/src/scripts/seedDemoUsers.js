const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Customer = require('../models/Customer');
const Worker = require('../models/Worker');
const Contractor = require('../models/Contractor');

const DEMO_PASSWORD = 'Demo@12345';

async function upsertDemo(Model, query, data) {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  return Model.findOneAndUpdate(
    query,
    { $set: { ...data, passwordHash, isActive: true } },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
  );
}

async function main() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not configured');
  await mongoose.connect(process.env.MONGO_URI);

  await upsertDemo(Customer, { email: 'demo.customer@anvaya.test' }, {
    name: 'Anvaya Demo Customer',
    email: 'demo.customer@anvaya.test',
    phone: '9000010001',
    address: 'Demo Town'
  });

  await upsertDemo(Worker, { email: 'demo.worker@anvaya.test' }, {
    name: 'Ramesh Kumar',
    email: 'demo.worker@anvaya.test',
    phone: '9000010002',
    skills: ['electrician', 'plumber'],
    isAvailable: true,
    verification: { status: 'verified', provider: 'manual', documents: [] }
  });

  await upsertDemo(Contractor, { email: 'demo.contractor@anvaya.test' }, {
    name: 'Anvaya Demo Contractor',
    email: 'demo.contractor@anvaya.test',
    phone: '9000010003',
    companyName: 'Demo Works',
    location: 'Demo Town',
    primaryService: 'Home Services'
  });

  console.log('Demo users are ready.');
  console.log('Password for all demo users:', DEMO_PASSWORD);
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error('Demo seed failed:', error);
  try {
    await mongoose.disconnect();
  } catch {
    // Ignore disconnect errors while handling a seed failure.
  }
  process.exit(1);
});
