import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { INITIAL_INSTITUTES } from './src/data/institutesData.ts';
import { INITIAL_ARTICLES } from './src/data/articlesData.ts';
import { EnquiryData, Institute, Article } from './src/types/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const NOTIFICATION_EMAIL = 'yashpatelseo19@gmail.com';

app.use(express.json());

// In-memory + persistent storage
let institutes: Institute[] = [...INITIAL_INSTITUTES];
let articles: Article[] = [...INITIAL_ARTICLES];
let enquiries: EnquiryData[] = [
  {
    id: 'ENQ-INIT-001',
    fullName: 'Rahul Sharma',
    mobileNumber: '+91 98765 43210',
    email: 'rahul.s@example.com',
    country: 'India',
    city: 'Mumbai',
    courseInterestedIn: 'PGDM (Dual Specialization)',
    collegeName: 'Narayana Business School',
    preferredIntake: 'Autumn 2026',
    highestQualification: 'B.Tech in Computer Science',
    workExperience: '2 Years in IT Consultancy',
    message: 'Interested in knowing scholarship eligibility and entrance cutoff criteria for PGDM.',
    consent: true,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'Contacted'
  },
  {
    id: 'ENQ-INIT-002',
    fullName: 'Claire Dubois',
    mobileNumber: '+33 6 12 34 56 78',
    email: 'c.dubois@example.fr',
    country: 'France',
    city: 'Paris',
    courseInterestedIn: 'Global Accelerated MBA',
    collegeName: 'Fontainebleau Institute of International Management',
    preferredIntake: 'January 2027',
    highestQualification: 'Master of Economics',
    workExperience: '4 Years in Financial Services',
    message: 'Requesting syllabus details regarding sustainable finance electives.',
    consent: true,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'In Review'
  }
];

// Helper: Sanitize string
function sanitize(input: any): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .trim();
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// 1. POST /api/enquiry - Validate, sanitize, record, and dispatch email notification
app.post('/api/enquiry', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      mobileNumber,
      email,
      country,
      city,
      courseInterestedIn,
      collegeName,
      preferredIntake,
      highestQualification,
      workExperience,
      message,
      consent
    } = req.body;

    // Field Validations
    const cleanName = sanitize(fullName);
    const cleanMobile = sanitize(mobileNumber);
    const cleanEmail = sanitize(email);
    const cleanCourse = sanitize(courseInterestedIn);
    const cleanCollege = sanitize(collegeName);

    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({ error: 'Please provide a valid full name (minimum 2 characters).' });
    }

    if (!cleanMobile || cleanMobile.length < 7) {
      return res.status(400).json({ error: 'Please provide a valid mobile number.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (!cleanCourse) {
      return res.status(400).json({ error: 'Please select or specify the course interested in.' });
    }

    if (!cleanCollege) {
      return res.status(400).json({ error: 'Please specify the college/institute name.' });
    }

    if (!consent) {
      return res.status(400).json({ error: 'You must agree to be contacted regarding program information.' });
    }

    const enquiryId = `ENQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newEnquiry: EnquiryData = {
      id: enquiryId,
      fullName: cleanName,
      mobileNumber: cleanMobile,
      email: cleanEmail,
      country: sanitize(country) || 'Not specified',
      city: sanitize(city) || 'Not specified',
      courseInterestedIn: cleanCourse,
      collegeName: cleanCollege,
      preferredIntake: sanitize(preferredIntake) || 'Upcoming Batch',
      highestQualification: sanitize(highestQualification) || 'Not specified',
      workExperience: sanitize(workExperience) || 'Not specified',
      message: sanitize(message) || 'No additional message provided.',
      consent: true,
      createdAt: new Date().toISOString(),
      status: 'New'
    };

    enquiries.unshift(newEnquiry);

    // Secure server-side notification email simulation
    // In production, nodemailer / SendGrid / Postmark connects here using NOTIFICATION_EMAIL
    console.log('====================================================');
    console.log(`[EMAIL NOTIFICATION DISPATCHED]`);
    console.log(`To: ${NOTIFICATION_EMAIL}`);
    console.log(`Subject: New Student Enquiry for ${newEnquiry.collegeName} [${newEnquiry.id}]`);
    console.log(`Applicant: ${newEnquiry.fullName} (${newEnquiry.email} | ${newEnquiry.mobileNumber})`);
    console.log(`Program: ${newEnquiry.courseInterestedIn} | Intake: ${newEnquiry.preferredIntake}`);
    console.log(`Location: ${newEnquiry.city}, ${newEnquiry.country}`);
    console.log(`Experience: ${newEnquiry.workExperience} | Qualification: ${newEnquiry.highestQualification}`);
    console.log(`Message: ${newEnquiry.message}`);
    console.log('====================================================');

    return res.status(201).json({
      success: true,
      enquiryId: newEnquiry.id,
      message: 'Your information request has been received. The admissions advisory team will contact you shortly.'
    });
  } catch (error: any) {
    console.error('Error processing enquiry:', error);
    return res.status(500).json({ error: 'Internal server error while recording your enquiry. Please try again.' });
  }
});

// 2. GET /api/enquiries - Admin view
app.get('/api/enquiries', (req: Request, res: Response) => {
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

// 3. PATCH /api/enquiries/:id/status - Update enquiry status
app.patch('/api/enquiries/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const enquiry = enquiries.find(e => e.id === id);
  if (!enquiry) {
    return res.status(404).json({ error: 'Enquiry not found.' });
  }
  if (['New', 'Contacted', 'In Review', 'Closed'].includes(status)) {
    enquiry.status = status;
    return res.json({ success: true, data: enquiry });
  }
  return res.status(400).json({ error: 'Invalid status.' });
});

// 4. GET /api/institutes - Filterable search
app.get('/api/institutes', (req: Request, res: Response) => {
  const { q, country, city, specialization, programType, featured } = req.query;

  let results = [...institutes];

  if (q && typeof q === 'string' && q.trim()) {
    const query = q.toLowerCase().trim();
    results = results.filter(inst =>
      inst.name.toLowerCase().includes(query) ||
      inst.city.toLowerCase().includes(query) ||
      inst.country.toLowerCase().includes(query) ||
      inst.specializations.some(s => s.toLowerCase().includes(query)) ||
      inst.courses.some(c => c.name.toLowerCase().includes(query))
    );
  }

  if (country && typeof country === 'string' && country !== 'All Countries') {
    results = results.filter(inst =>
      inst.country.toLowerCase() === country.toLowerCase() ||
      inst.countrySlug.toLowerCase() === country.toLowerCase()
    );
  }

  if (city && typeof city === 'string' && city !== 'All Cities') {
    results = results.filter(inst => inst.city.toLowerCase() === city.toLowerCase());
  }

  if (specialization && typeof specialization === 'string' && specialization !== 'All Specializations') {
    results = results.filter(inst =>
      inst.specializations.some(s => s.toLowerCase() === specialization.toLowerCase())
    );
  }

  if (programType && typeof programType === 'string' && programType !== 'All Program Types') {
    results = results.filter(inst =>
      inst.programType.toLowerCase().includes(programType.toLowerCase()) ||
      inst.courses.some(c => c.type.toLowerCase().includes(programType.toLowerCase()))
    );
  }

  if (featured === 'true') {
    results = results.filter(inst => inst.featured);
  }

  res.json({ success: true, count: results.length, data: results });
});

// 5. GET /api/institutes/:slug - Detail
app.get('/api/institutes/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const institute = institutes.find(i => i.slug.toLowerCase() === slug.toLowerCase());
  if (!institute) {
    return res.status(404).json({ error: 'Institute not found' });
  }
  res.json({ success: true, data: institute });
});

// 6. POST /api/institutes - Admin create
app.post('/api/institutes', (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.name || !data.country || !data.city) {
      return res.status(400).json({ error: 'Institute Name, Country, and City are required.' });
    }

    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newInst: Institute = {
      id: `inst-${Date.now()}`,
      slug,
      name: sanitize(data.name),
      country: sanitize(data.country),
      countrySlug: sanitize(data.country).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      city: sanitize(data.city),
      logo: data.logo || 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=160&auto=format&fit=crop&q=80',
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
      description: sanitize(data.description) || 'Comprehensive business administration and management program.',
      overview: sanitize(data.overview) || data.description || '',
      officialWebsite: sanitize(data.officialWebsite) || 'https://example.edu',
      programType: data.programType || 'Full-time MBA',
      duration: data.duration || '2 Years',
      tuitionFee: data.tuitionFee || 'Contact Institute',
      currency: data.currency || 'USD',
      specializations: Array.isArray(data.specializations) ? data.specializations : ['General Management'],
      eligibility: sanitize(data.eligibility) || 'Bachelor’s degree and valid entrance exam score.',
      applicationProcess: sanitize(data.applicationProcess) || 'Online application followed by interview.',
      applicationUrl: data.applicationUrl || data.officialWebsite || 'https://example.edu',
      scholarships: sanitize(data.scholarships) || 'Merit and need-based financial aid options available.',
      careerInfo: sanitize(data.careerInfo) || 'Comprehensive career placement services with corporate partnerships.',
      campusInfo: sanitize(data.campusInfo) || 'Modern classrooms, digital libraries, and collaborative spaces.',
      internationalInfo: sanitize(data.internationalInfo) || 'Visa advisory and international student orientation.',
      featured: Boolean(data.featured),
      establishedYear: Number(data.establishedYear) || 2000,
      accreditedBy: Array.isArray(data.accreditedBy) ? data.accreditedBy : ['Recognized University'],
      courses: Array.isArray(data.courses) && data.courses.length > 0 ? data.courses : [
        {
          id: `c-${Date.now()}`,
          name: `${data.name} MBA`,
          type: 'Full-time MBA',
          duration: data.duration || '2 Years',
          tuitionFee: data.tuitionFee || 'Contact Institute',
          mode: 'Full-time',
          specializations: Array.isArray(data.specializations) ? data.specializations : ['General Management'],
          eligibility: data.eligibility || 'Graduation degree',
          overview: 'Comprehensive management training.'
        }
      ]
    };

    institutes.unshift(newInst);
    res.status(201).json({ success: true, data: newInst });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 7. PUT /api/institutes/:slug - Admin update
app.put('/api/institutes/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const index = institutes.findIndex(i => i.slug === slug);
  if (index === -1) {
    return res.status(404).json({ error: 'Institute not found.' });
  }
  institutes[index] = { ...institutes[index], ...req.body };
  res.json({ success: true, data: institutes[index] });
});

// 8. DELETE /api/institutes/:slug - Admin delete
app.delete('/api/institutes/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const initialLen = institutes.length;
  institutes = institutes.filter(i => i.slug !== slug);
  if (institutes.length === initialLen) {
    return res.status(404).json({ error: 'Institute not found.' });
  }
  res.json({ success: true, message: 'Institute deleted successfully.' });
});

// 9. Articles APIs
app.get('/api/articles', (req: Request, res: Response) => {
  const { category } = req.query;
  let results = [...articles];
  if (category && typeof category === 'string' && category !== 'All') {
    results = results.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }
  res.json({ success: true, count: results.length, data: results });
});

app.get('/api/articles/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const article = articles.find(a => a.slug === slug);
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  res.json({ success: true, data: article });
});

// 10. SEO: Robots.txt
app.get('/robots.txt', (req: Request, res: Response) => {
  const appUrl = process.env.APP_URL || `http://${req.headers.host}`;
  const robotsTxt = `# Robots.txt for Global MBA & Management Education Directory
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${appUrl}/sitemap.xml
`;
  res.type('text/plain').send(robotsTxt);
});

// 11. SEO: XML Sitemap
app.get('/sitemap.xml', (req: Request, res: Response) => {
  const appUrl = process.env.APP_URL || `http://${req.headers.host}`;
  const currentDate = new Date().toISOString().split('T')[0];

  const staticUrls = [
    '',
    '/mba-colleges/',
    '/courses/mba/',
    '/courses/executive-mba/',
    '/courses/mim/',
    '/specializations/finance/',
    '/specializations/marketing/',
    '/specializations/business-analytics/',
    '/blog/'
  ];

  const countryUrls = [
    'india', 'usa', 'uk', 'france', 'germany', 'spain', 'canada',
    'australia', 'singapore', 'uae', 'switzerland', 'netherlands',
    'italy', 'ireland', 'japan', 'south-korea'
  ].map(c => `/mba-colleges/${c}/`);

  const instituteUrls = institutes.map(inst => `/college/${inst.slug}/`);
  const articleUrls = articles.map(art => `/blog/${art.slug}/`);

  const allUrls = [
    ...staticUrls.map(u => ({ loc: `${appUrl}${u}`, priority: u === '' ? '1.0' : '0.8', changefreq: 'weekly' })),
    ...countryUrls.map(u => ({ loc: `${appUrl}${u}`, priority: '0.85', changefreq: 'weekly' })),
    ...instituteUrls.map(u => ({ loc: `${appUrl}${u}`, priority: '0.9', changefreq: 'weekly' })),
    ...articleUrls.map(u => ({ loc: `${appUrl}${u}`, priority: '0.7', changefreq: 'monthly' }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(item => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.type('application/xml').send(xml);
});

// -------------------------------------------------------------
// Vite middleware / Static server setup
// -------------------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Global MBA Portal Server running on http://localhost:${PORT}`);
  });
}

startServer();
