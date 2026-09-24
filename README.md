# Global MBA & Management Education Directory

A complete, modern, responsive educational website and independent information portal designed to help prospective students discover, compare, and enquire about MBA, PGDM, Executive MBA, MiM, and related management programs around the world.

---

## 🌟 Key Features

1. **Homepage**
   - **Hero Section**: *"Find MBA Programs & Business Schools Worldwide"*
   - **Subtitle**: *"Explore MBA, Executive MBA, MiM and management programs from business schools around the world."*
   - **Multi-Field Search**: Instant search by college/institute, country, city, and MBA specialization.
   - **Curated Sections**:
     - Featured Business Schools (with Narayana Business School, Fontainebleau, Cambridge, Manhattan, etc.)
     - MBA Programs Breakdown (Full-Time, Executive MBA, MiM, PGDM)
     - Executive MBA Programs Showcase
     - MBA by Country (16+ destinations including India, USA, UK, France, Germany, Spain, Canada, Singapore, etc.)
     - MBA by Specialization (Finance, Marketing, Business Analytics, Strategy & Leadership, Supply Chain, Healthcare, etc.)
     - Recently Added Institutes & Popular Destinations
     - Admission Resources & Articles
     - Free Student Counseling CTA

2. **Global Institute Directory (`/mba-colleges/`)**
   - Country categories: India, USA, UK, France, Germany, Spain, Canada, Australia, Singapore, UAE, Switzerland, Netherlands, Italy, Ireland, Japan, South Korea, etc.
   - Profile cards with institute name, location, logos, cover images, program types, duration, tuition fees, specializations, official website button, View Details, and Enquire Now.
   - Real-time multi-filter sidebar by country, specialization, program type, and keyword search.
   - Clean pagination and breadcrumbs.

3. **Institute Detail Pages (`/college/:slug/`)**
   - Institute overview, location, established year, accreditations.
   - Course listings with durations, tuition fees, eligibility, and modes.
   - Executive programs & specialization tracks.
   - Admissions process, scholarship grants, and financial aid.
   - Career support & placement information.
   - Campus infrastructure and international student visa information.
   - Prominent **"Request Information"** button & official website external links.
   - Right sidebar advertisement for **Top MBA Colleges in India** linking to NBS.
   - Schema.org `Course` and `FAQPage` JSON-LD structured data.

4. **Popup Enquiry Form & Backend Email Notification**
   - Triggered on any *"Enquire Now"*, *"Request Information"*, *"Apply / Get Details"*, or *"Contact College"* click.
   - Pre-fills institute name and course interested in.
   - Form fields: Full Name, Mobile Number, Email Address, Country, City, Course Interested In, College Name, Preferred Intake, Highest Qualification, Work Experience, Message, and Consent Checkbox (*"I agree to be contacted regarding education and program information."*).
   - Strict field validation and error sanitization.
   - Submits to `POST /api/enquiry`.
   - **Email Notification**: Server-side dispatcher sends notifications to `yashpatelseo19@gmail.com` with applicant details and enquiry reference ID. The recipient email is never exposed in frontend code.

5. **Right Sidebar Advertisement Card**
   - Clearly labeled with an **"Advertisement"** tag.
   - Headline: *"Top MBA Colleges in India"*
   - Short text: *"Explore MBA programs, admissions, fees, placements and program details."*
   - CTA: *"Explore MBA Colleges"*
   - Destination URL: [https://nbs.edu.in/top-mba-colleges-in-india/](https://nbs.edu.in/top-mba-colleges-in-india/) (opens in new tab with `target="_blank" rel="noopener noreferrer"`).
   - Displayed on desktop institute profile and article pages.

6. **SEO & Clean URL Structure**
   - Clean URLs:
     - `/mba-colleges/`
     - `/mba-colleges/india/`
     - `/mba-colleges/usa/`
     - `/mba-colleges/france/`
     - `/college/narayana-business-school/`
     - `/courses/mba/`
     - `/courses/executive-mba/`
     - `/specializations/finance/`
     - `/specializations/business-analytics/`
     - `/blog/`
     - `/blog/top-mba-specializations-future-careers/`
   - Dynamic `<title>` and `<meta name="description">` tags.
   - Canonical links (`<link rel="canonical">`).
   - Open Graph (`og:title`, `og:description`, `og:url`, `og:type`) & Twitter Cards.
   - XML Sitemap generated at `/sitemap.xml`.
   - Crawler directives at `/robots.txt`.
   - JSON-LD schemas: `BreadcrumbList`, `EducationalOrganization`, `Course`, `Article`, `FAQPage`.

8. **Database Schema**
   - PostgreSQL schema script available at `database/schema.sql`.
   - Tables: `institutes`, `courses`, `enquiries`, `articles`, and indexes for fast search.
   - Resilient in-memory/JSON storage fallback in Express server to ensure instant out-of-the-box local execution.

---

## 🚀 Setup & Local Execution

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default configuration values:
- `PORT=3000`
- `APP_URL=http://localhost:3000`

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 🛡️ Independent Education Portal Policy
This is an independent information directory. We do not claim affiliation with Harvard, INSEAD, Stanford, Wharton, NBS, or any listed institution unless explicitly stated. Information is collected from public official university sources for reference. No fabricated rankings or review scores are generated.
