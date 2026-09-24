export interface Course {
  id: string;
  name: string;
  type: 'Full-time MBA' | 'Executive MBA' | 'Global MBA' | 'MiM' | 'Online MBA' | 'PGDM';
  duration: string;
  tuitionFee: string;
  mode: 'Full-time' | 'Part-time' | 'Executive' | 'Online' | 'Hybrid';
  specializations: string[];
  eligibility: string;
  overview: string;
  credits?: string;
  intakes?: string[];
}

export interface Institute {
  id: string;
  slug: string;
  name: string;
  country: string;
  countrySlug: string;
  city: string;
  logo: string;
  coverImage: string;
  description: string;
  overview: string;
  officialWebsite: string;
  programType: string;
  duration: string;
  tuitionFee: string;
  currency: string;
  specializations: string[];
  eligibility: string;
  applicationProcess: string;
  applicationUrl: string;
  scholarships: string;
  careerInfo: string;
  campusInfo: string;
  internationalInfo: string;
  featured: boolean;
  popularDestination?: boolean;
  establishedYear: number;
  accreditedBy: string[];
  courses: Course[];
  faqs?: { question: string; answer: string }[];
}

export interface EnquiryData {
  id?: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  country: string;
  city: string;
  courseInterestedIn: string;
  collegeName: string;
  preferredIntake: string;
  highestQualification: string;
  workExperience: string;
  message: string;
  consent: boolean;
  createdAt?: string;
  status?: 'New' | 'Contacted' | 'In Review' | 'Closed';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  country?: string;
  coverImage: string;
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
}

export interface FilterState {
  search: string;
  country: string;
  city: string;
  specialization: string;
  programType: string;
}
