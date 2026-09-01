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

const cityCenters = [
  ['Gwalior', 26.2183, 78.1828],
  ['Agra', 27.1767, 78.0081],
  ['Delhi', 28.6139, 77.2090],
  ['Jaipur', 26.9124, 75.7873],
  ['Lucknow', 26.8467, 80.9462],
  ['Bhopal', 23.2599, 77.4126],
  ['Indore', 22.7196, 75.8577],
  ['Nagpur', 21.1458, 79.0882],
  ['Pune', 18.5204, 73.8567],
  ['Bengaluru', 12.9716, 77.5946]
];

const firstNames = ['Amit', 'Ravi', 'Suresh', 'Mahesh', 'Anil', 'Vikram', 'Prakash', 'Mohan', 'Deepak', 'Rajesh', 'Sunil', 'Manoj', 'Dinesh', 'Arun', 'Rakesh', 'Karan', 'Nitin', 'Pawan', 'Ajay', 'Vijay'];
const lastNames = ['Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Yadav', 'Gupta', 'Mishra', 'Jain', 'Meena'];
const skillSets = [
  ['electrician'], ['plumber'], ['carpenter'], ['painter'], ['mason'],
  ['electrician', 'plumber'], ['electrician', 'carpenter'], ['plumber', 'mason'],
  ['carpenter', 'painter'], ['electrician', 'painter']
];

function buildWorkers() {
  const workers = [];
  for (let index = 0; index < 100; index += 1) {
    const [city, baseLat, baseLon] = cityCenters[index % cityCenters.length];
    const cityIndex = Math.floor(index / cityCenters.length);
    const offsetLat = (((index * 37) % 17) - 8) * 0.006;
    const offsetLon = (((index * 53) % 19) - 9) * 0.006;
    const skills = skillSets[index % skillSets.length];
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[(index * 3) % lastNames.length];
    const ratingAverage = Number((4.1 + ((index * 7) % 9) / 10).toFixed(1));
    const ratingCount = 3 + ((index * 11) % 36);

    workers.push({
      email: `demo.worker.${String(index + 1).padStart(3, '0')}@anvaya.test`,
      name: `${firstName} ${lastName} ${index + 1}`,
      phone: `91000${String(10000 + index).slice(-5)}`,
      skills,
      location: {
        type: 'Point',
        coordinates: [Number((baseLon + offsetLon).toFixed(6)), Number((baseLat + offsetLat).toFixed(6))]
      },
      rating: { average: ratingAverage, count: ratingCount },
      demoCity: city,
      experienceYears: 2 + ((index + cityIndex) % 13)
    });
  }
  return workers;
}

async function main() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not configured');
  await mongoose.connect(process.env.MONGO_URI);

  const demoLocation = { type: 'Point', coordinates: [78.1828, 26.2183] };

  await upsertDemo(Customer, { email: 'demo.customer@anvaya.test' }, {
    name: 'Anvaya Demo Customer',
    email: 'demo.customer@anvaya.test',
    phone: '9000010001',
    address: 'Demo Town',
    location: demoLocation
  });

  const demoWorkers = buildWorkers();
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
  console.log('Demo workers are distributed across 10 Indian city regions.');
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
