const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Customer = require('../models/Customer');
const Worker = require('../models/Worker');
const Admin = require('../models/Admin');
const Contractor = require('../models/Contractor');

const DEMO_PASSWORD = 'Demo@12345';

async function upsertDemo(Model, query, data) {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  return Model.findOneAndUpdate(
    query,
    { $set: { ...data, passwordHash, ...(Model === Worker || Model === Customer || Model === Contractor ? { isActive: true } : {}) } },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
  );
}

const cityCenters = [
  ['Gwalior', 26.2183, 78.1828], ['Agra', 27.1767, 78.0081], ['Delhi', 28.6139, 77.2090],
  ['Jaipur', 26.9124, 75.7873], ['Lucknow', 26.8467, 80.9462], ['Bhopal', 23.2599, 77.4126],
  ['Indore', 22.7196, 75.8577], ['Nagpur', 21.1458, 79.0882], ['Pune', 18.5204, 73.8567],
  ['Bengaluru', 12.9716, 77.5946]
];

const workerProfiles = [
  ['Rakesh', 'Tomar', ['electrician']], ['Suresh', 'Kushwah', ['plumber']], ['Mahendra', 'Singh', ['carpenter']],
  ['Pooja', 'Verma', ['painter']], ['Imran', 'Khan', ['mason']], ['Vivek', 'Sharma', ['electrician', 'plumber']],
  ['Neeraj', 'Patel', ['electrician', 'carpenter']], ['Arvind', 'Yadav', ['plumber', 'mason']],
  ['Kavita', 'Gupta', ['carpenter', 'painter']], ['Rohit', 'Jain', ['electrician', 'painter']],
  ['Mukul', 'Mishra', ['electrician']], ['Shankar', 'Meena', ['plumber']], ['Farooq', 'Ansari', ['carpenter']],
  ['Sunita', 'Rani', ['painter']], ['Devendra', 'Parmar', ['mason']], ['Sachin', 'Saini', ['electrician', 'plumber']],
  ['Lokesh', 'Gurjar', ['electrician']], ['Naveen', 'Joshi', ['plumber']], ['Asha', 'Bisht', ['carpenter']],
  ['Manoj', 'Rathore', ['painter']], ['Raj', 'Kori', ['mason']], ['Hemant', 'Gupta', ['electrician']],
  ['Dilip', 'Chauhan', ['plumber']], ['Ramesh', 'Lodhi', ['carpenter']], ['Anita', 'Sharma', ['painter']],
  ['Wasim', 'Sheikh', ['mason']], ['Gaurav', 'Agarwal', ['electrician', 'plumber']], ['Nikhil', 'Tiwari', ['electrician']],
  ['Mukesh', 'Dhakad', ['plumber']], ['Rahul', 'Bhardwaj', ['carpenter']], ['Sanjay', 'Nagar', ['painter']],
  ['Ashok', 'Koli', ['mason']], ['Vishal', 'Kushwaha', ['electrician', 'carpenter']], ['Priya', 'Saxena', ['painter']],
  ['Brijesh', 'Thakur', ['plumber']], ['Kamal', 'Soni', ['electrician']], ['Jitendra', 'Solanki', ['mason']],
  ['Rohini', 'Pawar', ['carpenter', 'painter']], ['Atul', 'Tripathi', ['electrician']], ['Madan', 'Beniwal', ['plumber']],
  ['Kishan', 'Dangi', ['mason']], ['Harish', 'Rawat', ['electrician', 'plumber']], ['Seema', 'Mehta', ['carpenter']],
  ['Vikas', 'Malviya', ['painter']], ['Asif', 'Qureshi', ['mason']], ['Yogesh', 'Sengar', ['electrician']],
  ['Geeta', 'Chaudhary', ['plumber']], ['Rajiv', 'Kapoor', ['carpenter']], ['Nitin', 'Solanki', ['painter']],
  ['Iqbal', 'Khan', ['mason']], ['Ajay', 'Kori', ['electrician', 'plumber']], ['Deepak', 'Shukla', ['electrician']],
  ['Mohan', 'Jatav', ['plumber']], ['Karan', 'Rao', ['carpenter']], ['Shweta', 'Patil', ['painter']],
  ['Salim', 'Ansari', ['mason']], ['Pradeep', 'Soni', ['electrician']], ['Ritu', 'Yadav', ['plumber']],
  ['Bunty', 'Goswami', ['carpenter', 'painter']], ['Sanjana', 'Mishra', ['painter']], ['Ravi', 'Bisht', ['mason']],
  ['Akash', 'Verma', ['electrician', 'carpenter']], ['Nisha', 'Sharma', ['electrician']], ['Rajat', 'Mittal', ['plumber']],
  ['Bharat', 'Nayak', ['mason']], ['Manisha', 'Jain', ['carpenter']], ['Suraj', 'Khan', ['painter']],
  ['Dev', 'Kumari', ['electrician']], ['Vimal', 'Patel', ['plumber']], ['Sandeep', 'Yadav', ['carpenter']],
  ['Aman', 'Singh', ['painter']], ['Omprakash', 'Meena', ['mason']], ['Tarun', 'Gupta', ['electrician', 'plumber']],
  ['Rekha', 'Tomar', ['electrician']], ['Naresh', 'Chauhan', ['plumber']], ['Javed', 'Khan', ['carpenter']],
  ['Lalit', 'Bansal', ['painter']], ['Rani', 'Kushwah', ['mason']], ['Yash', 'Sharma', ['electrician']],
  ['Sonu', 'Jain', ['plumber']], ['Gopal', 'Rathore', ['carpenter']], ['Kiran', 'Singh', ['painter']],
  ['Faisal', 'Qureshi', ['mason']], ['Samar', 'Patel', ['electrician', 'plumber']], ['Nandini', 'Joshi', ['electrician']],
  ['Umesh', 'Verma', ['plumber']], ['Chirag', 'Agarwal', ['carpenter']], ['Meena', 'Yadav', ['painter']],
  ['Rauf', 'Ansari', ['mason']], ['Vijay', 'Saini', ['electrician']], ['Komal', 'Mehta', ['plumber']],
  ['Pankaj', 'Sharma', ['carpenter', 'painter']], ['Shivam', 'Gupta', ['electrician']], ['Anurag', 'Tripathi', ['plumber']],
  ['Bhupendra', 'Singh', ['mason']], ['Tanvi', 'Patel', ['carpenter']], ['Kunal', 'Bhardwaj', ['painter']],
  ['Rohit', 'Soni', ['electrician', 'plumber']], ['Simran', 'Kaur', ['electrician']], ['Devansh', 'Jain', ['plumber']],
  ['Arun', 'Meena', ['carpenter']], ['Mansi', 'Sharma', ['painter']], ['Junaid', 'Khan', ['mason']],
  ['Chetan', 'Patel', ['electrician']], ['Pritam', 'Yadav', ['plumber']], ['Varun', 'Rana', ['carpenter']],
  ['Neha', 'Gupta', ['painter']], ['Rohit', 'Choudhary', ['mason']]
];

function buildWorkers() {
  return workerProfiles.map(([firstName, lastName, skills], index) => {
    const [city, baseLat, baseLon] = cityCenters[index % cityCenters.length];
    const cityIndex = Math.floor(index / cityCenters.length);
    const offsetLat = (((index * 37) % 17) - 8) * 0.006;
    const offsetLon = (((index * 53) % 19) - 9) * 0.006;
    return {
      email: `demo.worker.${String(index + 1).padStart(3, '0')}@anvaya.test`,
      name: `${firstName} ${lastName}`,
      phone: `91000${String(10000 + index).slice(-5)}`,
      skills,
      location: { type: 'Point', coordinates: [Number((baseLon + offsetLon).toFixed(6)), Number((baseLat + offsetLat).toFixed(6))] },
      rating: { average: Number((4.1 + ((index * 7) % 9) / 10).toFixed(1)), count: 3 + ((index * 11) % 36) },
      demoCity: city,
      experienceYears: 2 + ((index + cityIndex) % 13)
    };
  });
}

async function main() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not configured');
  await mongoose.connect(process.env.MONGO_URI);
  const demoLocation = { type: 'Point', coordinates: [78.1828, 26.2183] };

  await upsertDemo(Customer, { email: 'demo.customer@anvaya.test' }, {
    name: 'Anvaya Demo Customer', email: 'demo.customer@anvaya.test', phone: '9000010001', address: 'Demo Town', location: demoLocation
  });

  await upsertDemo(Admin, { email: 'demo.admin@anvaya.test' }, {
    name: 'Anvaya Demo Admin', email: 'demo.admin@anvaya.test', role: 'superadmin'
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
    name: 'Anvaya Demo Contractor', email: 'demo.contractor@anvaya.test', phone: '9000010003', companyName: 'Demo Works', location: 'Demo Town', primaryService: 'Home Services'
  });

  console.log(`Demo users are ready. ${demoWorkers.length} demo workers seeded.`);
  console.log('Demo workers have unique names, skills, ratings, experience and locations across 10 Indian city regions.');
  console.log('Demo customer/worker/admin/contractor password:', DEMO_PASSWORD);
  await mongoose.disconnect();
}

main().catch(async error => {
  console.error('Demo seed failed:', error);
  try { await mongoose.disconnect(); } catch { /* Ignore disconnect errors while handling a seed failure. */ }
  process.exit(1);
});
