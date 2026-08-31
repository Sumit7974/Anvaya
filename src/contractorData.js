// ==========================================
// ANVAYA — CONTRACTOR MOCK DATA
// ==========================================

// ------------------------------------------
// AVAILABLE WORKERS
// ------------------------------------------

export const contractorWorkers = [
  {
    id: 1,
    name: "Ravi Kumar",
    skill: "Electrician",
    experience: 6,
    rating: 4.8,
    location: "Gwalior",
    phone: "9876543210",
    available: true,
    jobsCompleted: 124,
    distance: "1.2 km",
    icon: "⚡",
  },
  {
    id: 2,
    name: "Mohan Singh",
    skill: "Plumber",
    experience: 8,
    rating: 4.7,
    location: "Gwalior",
    phone: "9876543211",
    available: true,
    jobsCompleted: 156,
    distance: "2.4 km",
    icon: "🔧",
  },
  {
    id: 3,
    name: "Amit Sharma",
    skill: "Mason",
    experience: 10,
    rating: 4.9,
    location: "Gwalior",
    phone: "9876543212",
    available: true,
    jobsCompleted: 198,
    distance: "1.8 km",
    icon: "🧱",
  },
  {
    id: 4,
    name: "Suresh Yadav",
    skill: "Carpenter",
    experience: 7,
    rating: 4.6,
    location: "Gwalior",
    phone: "9876543213",
    available: true,
    jobsCompleted: 112,
    distance: "3.1 km",
    icon: "🪚",
  },
  {
    id: 5,
    name: "Deepak Verma",
    skill: "Painter",
    experience: 5,
    rating: 4.5,
    location: "Gwalior",
    phone: "9876543214",
    available: false,
    jobsCompleted: 89,
    distance: "4.2 km",
    icon: "🎨",
  },
  {
    id: 6,
    name: "Rahul Patel",
    skill: "Electrician",
    experience: 4,
    rating: 4.7,
    location: "Gwalior",
    phone: "9876543215",
    available: true,
    jobsCompleted: 76,
    distance: "2.0 km",
    icon: "⚡",
  },
  {
    id: 7,
    name: "Vijay Thakur",
    skill: "Mason",
    experience: 9,
    rating: 4.8,
    location: "Gwalior",
    phone: "9876543216",
    available: true,
    jobsCompleted: 167,
    distance: "2.7 km",
    icon: "🧱",
  },
  {
    id: 8,
    name: "Rakesh Kushwah",
    skill: "Plumber",
    experience: 6,
    rating: 4.6,
    location: "Gwalior",
    phone: "9876543217",
    available: true,
    jobsCompleted: 103,
    distance: "3.5 km",
    icon: "🔧",
  },
];

// ------------------------------------------
// CONTRACTOR SERVICES
// ------------------------------------------

export const contractorServices = [
  {
    id: "electrician",
    name: "Electrician",
    icon: "⚡",
    description: "Electrical installation and repair work",
  },
  {
    id: "plumber",
    name: "Plumber",
    icon: "🔧",
    description: "Pipes, taps, water supply and repairs",
  },
  {
    id: "mason",
    name: "Mason",
    icon: "🧱",
    description: "Construction and brickwork services",
  },
  {
    id: "carpenter",
    name: "Carpenter",
    icon: "🪚",
    description: "Furniture and woodwork services",
  },
  {
    id: "painter",
    name: "Painter",
    icon: "🎨",
    description: "Interior and exterior painting",
  },
];

// ------------------------------------------
// INITIAL PROJECTS
// ------------------------------------------

export const initialProjects = [
  {
    id: 101,
    name: "Residential House Renovation",
    service: "Mason",
    location: "Gwalior",
    description:
      "Renovation work including walls, flooring and general construction.",
    status: "Active",
    budget: 75000,
    deadline: "30 Aug 2026",
    assignedWorkers: [3, 7],
    workers: [
      contractorWorkers[2],
      contractorWorkers[6],
    ],
    createdAt: "2026-08-25",
    progress: 65,
  },

  {
    id: 102,
    name: "Electrical Installation",
    service: "Electrician",
    location: "Gwalior",
    description:
      "Complete electrical wiring and ceiling fan installation.",
    status: "Planning",
    budget: 40000,
    deadline: "05 Sep 2026",
    assignedWorkers: [1],
    workers: [
      contractorWorkers[0],
    ],
    createdAt: "2026-08-26",
    progress: 20,
  },
];

// ------------------------------------------
// PROJECT STATUS OPTIONS
// ------------------------------------------

export const projectStatuses = [
  "Planning",
  "Active",
  "Workers Assigned",
  "In Progress",
  "Completed",
];