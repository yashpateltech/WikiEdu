-- ==========================================================
-- Global MBA & Management Education Directory Database Schema
-- Database: PostgreSQL (or Cloud SQL PostgreSQL)
-- ==========================================================

-- 1. Create Enums
DO $$ BEGIN
  CREATE TYPE program_type_enum AS ENUM (
    'Full-time MBA',
    'Executive MBA',
    'Global MBA',
    'MiM',
    'Online MBA',
    'PGDM'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE enquiry_status_enum AS ENUM (
    'New',
    'Contacted',
    'In Review',
    'Closed'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Institutes Table
CREATE TABLE IF NOT EXISTS institutes (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  country_slug VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  logo VARCHAR(500) NOT NULL,
  cover_image VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  overview TEXT NOT NULL,
  official_website VARCHAR(255) NOT NULL,
  program_type VARCHAR(100) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  tuition_fee VARCHAR(100) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  specializations TEXT[] NOT NULL DEFAULT '{}',
  eligibility TEXT NOT NULL,
  application_process TEXT NOT NULL,
  application_url VARCHAR(500) NOT NULL,
  scholarships TEXT NOT NULL,
  career_info TEXT NOT NULL,
  campus_info TEXT NOT NULL,
  international_info TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  popular_destination BOOLEAN NOT NULL DEFAULT false,
  established_year INTEGER NOT NULL,
  accredited_by TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Courses / Programs Table
CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR(64) PRIMARY KEY,
  institute_id VARCHAR(64) NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(64) NOT NULL,
  duration VARCHAR(64) NOT NULL,
  tuition_fee VARCHAR(64) NOT NULL,
  mode VARCHAR(64) NOT NULL,
  specializations TEXT[] NOT NULL DEFAULT '{}',
  eligibility TEXT NOT NULL,
  overview TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Student Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
  id VARCHAR(64) PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  mobile_number VARCHAR(30) NOT NULL,
  email VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  city VARCHAR(100),
  course_interested_in VARCHAR(150) NOT NULL,
  college_name VARCHAR(255) NOT NULL,
  preferred_intake VARCHAR(100),
  highest_qualification VARCHAR(100),
  work_experience VARCHAR(100),
  message TEXT,
  consent BOOLEAN NOT NULL DEFAULT true,
  status VARCHAR(30) NOT NULL DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  country VARCHAR(100) DEFAULT 'Global',
  cover_image VARCHAR(500) NOT NULL,
  published_date VARCHAR(100) NOT NULL,
  read_time VARCHAR(50) NOT NULL,
  author_name VARCHAR(100) NOT NULL,
  author_role VARCHAR(100) NOT NULL,
  author_avatar VARCHAR(500),
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Indexes for Performance & Search
CREATE INDEX IF NOT EXISTS idx_institutes_country ON institutes(country_slug);
CREATE INDEX IF NOT EXISTS idx_institutes_featured ON institutes(featured);
CREATE INDEX IF NOT EXISTS idx_institutes_slug ON institutes(slug);
CREATE INDEX IF NOT EXISTS idx_courses_institute ON courses(institute_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
