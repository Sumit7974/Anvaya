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
    address: 'Demo Town',
    location: { type: 'Point', coordinates: [77.5946, 12.9716] }
  });

  const demoWorkers = [
    {
      email: 'demo.worker@anvaya.test', name: 'Ramesh Kumar', phone: '9000010002',
      skills: ['electrician', 'plumber'], location: { type: 'Point', coordinates: [77.5946, 12.9716] },
      rating: { average: 4.8, count: 12 }
    },
    {
      email: 'demo.worker2@anvaya.test', name: 'Suresh Electrician', phone: '9000010012',
      skills: ['electrician'], location: { type: 'Point', coordinates: [77.5858, 12.9792] },
      rating: { average: 4.6, count: 8 }
    },
    {
      email: 'demo.worker3@anvaya.test', name: 'Mahesh Electrician', phone: '9000010013',
      skills: ['electrician'], location: { type: 'Point', coordinates: [77.6102, 12.9654] },
      rating: { average: 4.9, count: 15 }
    },
    {
      email: 'demo.worker4@anvaya.test', name: 'Anil Kumar', phone: '9000010014',
      skills: ['electrician', 'carpenter'], location: { type: 'Point', coordinates: [77.5681, 12.9567] },
      rating: { average: 4.5, count: 6 }
    },
    {
      email: 'demo.worker5@anvaya.test', name: 'Ravi Plumber', phone: '9000010015',
      skills: ['plumber'], location: { type: 'Point', coordinates: [77.6028, 12.9906] },
      rating: { average: 4.7, count: 10 }
    },
    {
      email: 'demo.worker6@anvaya.test', name: 'Prakash Plumber', phone: '9000010016',
      skills: ['plumber'], location: { type: 'Point', coordinates: [77.5769, 12.9884] },
      rating: { average: 4.4, count: 5 }
    },
    {
      email: 'demo.worker7@anvaya.test', name: 'Vikram Carpenter', phone: '9000010017',
      skills: ['carpenter'], location: { type: 'Point', coordinates: [77.6175, 12.9518] },
      rating: { average: 4.8, count: 11 }
    },
    {
      email: 'demo.worker8@anvaya.test', name: 'Mohan Painter', phone: '9000010018',
      skills: ['painter'], location: { type: 'Point', coordinates: [77.5597, 12.9815] },
      rating: { average: 4.6, count: 7 }
    },
    {
      email: 'demo.worker9@anvaya.test', name: 'Deepak Mason', phone: '9000010019',
      skills: ['mason'], location: { type: 'Point', coordinates: [77.6264, 12.9741] },
      rating: { average: 4.5, count: 9 }
    }
  ];

  for (const worker of demoWorkers) {
    await upsertDemo(Worker, { email: worker.email }, {
      ...worker,
      verification: { status: 'verified', provider: 'manual', documents: [] },
      isAvailable: true
    });
  }

  await upsertDemo(Contractor, { email: 'demo.contractor@anvaya.test' }, {
    name: 'Anvaya Demo Contractor',
    email: 'demo.contractor@anvaya.test',
    phone: '9000010003',
    companyName: 'Demo Works',
    location: 'Demo Town',
    primaryService: 'Home Services'
  });

  console.log(`Demo users are ready. ${demoWorkers.length} demo workers seeded.`);
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