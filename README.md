# 🌐 anvaya.com — Frontend Web Application
**India's Dedicated On-Demand Fixed-Hour Gig Marketplace**

---

## 📁 Package Directory & Files

This folder contains **only the pure production-ready frontend files** for `anvaya.com`:

```
Documents/anvaya.comfinal/
├── index.html          # 🏠 Master Gateway Hub (Navigation Cards to All Interfaces)
├── client.html         # 👤 Client & Customer Marketplace (12 Specialists & Fixed-Hour Booking)
├── worker.html         # 🛠️ Worker Command Center (Dashboard, Earnings, Availability & OTPs)
├── leaderboard.html    # 🏆 Top Earners Leaderboard (Monthly Rankings & Podiums)
├── kyc.html            # 🛡️ KYC & Security Hub (DigiLocker Verification & ₹25k Insurance)
├── about.html          # ℹ️ About Us (Philosophy, 3 Core Pillars & Commission-Free Model)
├── styles.css          # 🎨 Universal Design System (Light / Dark / System Themes)
├── app.js              # ⚡ Client-Side State, Search, Filtering & Dynamic Booking Engine
└── README.md           # 📖 Project Documentation & Frontend Details
```

---

## 🌟 Core Frontend Features

### 1. Fixed-Hour Booking Engine (2h, 4h, 8h)
* **Pre-set Duration Cards**: Allows clients to select standard packages (2 Hours Quick Task, 4 Hours Half Day, 8 Hours Full Day) or choose custom hours.
* **Dynamic Fee Breakdown**: Calculates base rate × hours + ₹25 flat platform fee + ₹15 micro-insurance fee in real-time.
* **4-Digit Start OTP Generator**: Generates an OTP upon booking confirmation for on-arrival client verification.

### 2. Client Marketplace (`client.html`)
* **Live Keyword Search**: Instant search filtering across specialist names, titles, categories, and skill tags.
* **Category Filters**: Filter between Tech & Mobile, UI/UX Design, Electrical & Smart Home, Photo/Video, Deep Cleaning, Tutors, and Events.
* **My Bookings Dashboard**: Client modal showing active scheduled gigs, Start OTPs, and escrow status.

### 3. Worker Command Center (`worker.html`)
* **Real-Time Availability Toggle**: Switch between `🟢 Available for Bookings` and `🔴 Offline / Busy`.
* **Pro Earnings Dashboard**: Tracks net payouts (after flat ₹25 fee deduction), fixed hours delivered, and completed gigs.
* **Incoming Jobs & Start OTP Verification**: View client task notes, address, scheduled time, and mark jobs completed to release escrow.
* **Profile & Rate Editor**: Live form to update hourly rates, bio, skills, and payout UPI ID.

### 4. Top Earners Leaderboard (`leaderboard.html`)
* **Podium Highlights**: Gold (#1), Silver (#2), and Bronze (#3) monthly ranking cards.
* **Full Rankings Table**: Hours delivered, ratings, categories, and net monthly earnings.

### 5. KYC & Security Verification Hub (`kyc.html`)
* **Government Gateways**: DigiLocker Aadhaar, PAN Tax verification, penny-drop UPI verification, and digital background checks.
* **Active Insurance Policy**: ₹25,000 active on-job accident and property damage protection certificate.

### 6. Universal Theme Engine
* Supports **☀️ Light**, **🌙 Dark**, and **💻 System** modes with instant live switching and `localStorage` preference persistence.

---

## 🚀 How to Host / Publish Online for Free

### Option A: Netlify Drop (30 Seconds — 100% Free)
1. Go to **[https://app.netlify.com/drop](https://app.netlify.com/drop)** in your web browser.
2. Drag and drop the `anvaya.comfinal` folder directly into the upload area.
3. You will immediately get a live HTTPS URL (e.g., `https://anvaya.netlify.app`).

### Option B: Local Viewing (No Server Needed)
1. Open this folder: `C:\Users\SHIVAM SHARMA\Documents\anvaya.comfinal\`
2. Double-click **`index.html`** in any browser (Chrome, Edge, Firefox, Safari).

---

© 2026 anvaya.com. All rights reserved.
