import { Institute } from '../types/index.ts';
import colleges1000 from './colleges1000.json' with { type: 'json' };

export const INITIAL_INSTITUTES: Institute[] = colleges1000 as unknown as Institute[];

export const COUNTRIES = [
  'All Countries',
  'India',
  'USA',
  'UK',
  'France',
  'Germany',
  'Spain',
  'Canada',
  'Australia',
  'Singapore',
  'Japan',
  'South Korea',
  'Hong Kong & China',
  'Switzerland',
  'Netherlands',
  'Italy',
  'Ireland',
  'UAE'
];

export const SPECIALIZATIONS = [
  'All Specializations',
  'Finance',
  'Marketing',
  'Business Analytics',
  'Strategy & Leadership',
  'Supply Chain',
  'Entrepreneurship',
  'Technology Management',
  'Healthcare Management',
  'International Business'
];

export const PROGRAM_TYPES = [
  'All Program Types',
  'Full-time MBA',
  'Executive MBA',
  'MiM',
  'PGDM',
  'Online MBA'
];
