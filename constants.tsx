
import React from 'react';
import { 
  BuildingOfficeIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  UsersIcon, 
  CalendarIcon, 
  WalletIcon, 
  VideoCameraIcon, 
  ClipboardDocumentCheckIcon, 
  BookOpenIcon, 
  PresentationChartBarIcon, 
  AcademicCapIcon,
  SparklesIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import { PersonaData } from './types';

export const PERSONA_CONTENT: PersonaData[] = [
  {
    type: 'SUPER_ADMIN',
    label: 'Super Admin',
    tagline: 'Global Institutional Control',
    description: 'Manage your entire educational ecosystem from a single, unified command center.',
    features: [
      {
        id: 'sa-1',
        title: 'Multi-College Management',
        description: 'Easily create, configure, and oversee multiple college branches under one parent institution.',
        icon: <BuildingOfficeIcon className="w-6 h-6" />
      },
      {
        id: 'sa-2',
        title: 'Centralized System Control',
        description: 'Global permission settings, role-based access control, and platform-wide security protocols.',
        icon: <ShieldCheckIcon className="w-6 h-6" />
      },
      {
        id: 'sa-3',
        title: 'Institution-Level Analytics',
        description: 'Real-time cross-college performance metrics and strategic growth insights via AI-driven dashboards.',
        icon: <ChartBarIcon className="w-6 h-6" />
      }
    ]
  },
  {
    type: 'COLLEGE_ADMIN',
    label: 'College Admin',
    tagline: 'Operational Excellence',
    description: 'Empowering campus leaders with precision tools for day-to-day academic administration.',
    features: [
      {
        id: 'ca-1',
        title: 'Staff & Student Directory',
        description: 'Complete lifecycle management from enrollment to alumni tracking with digitized records.',
        icon: <UsersIcon className="w-6 h-6" />
      },
      {
        id: 'ca-2',
        title: 'Performance Monitoring',
        description: 'Automated alerts for low attendance or academic dips across departments and batches.',
        icon: <CalendarIcon className="w-6 h-6" />
      },
      {
        id: 'ca-3',
        title: 'Fees & Compliance',
        description: 'Integrated fee collection gateway and automated documentation for university compliance.',
        icon: <WalletIcon className="w-6 h-6" />
      }
    ]
  },
  {
    type: 'TEACHER',
    label: 'Teacher',
    tagline: 'Classroom Innovation',
    description: 'Reduced administrative friction so you can focus on what matters most: Teaching.',
    features: [
      {
        id: 't-1',
        title: 'Smart Scheduling',
        description: 'Drag-and-drop class approval workflow and automated clash-free timetable generation.',
        icon: <Squares2X2Icon className="w-6 h-6" />
      },
      {
        id: 't-2',
        title: 'Hybrid Class Delivery',
        description: 'Seamlessly switch between live interactive classes and managing high-quality recorded libraries.',
        icon: <VideoCameraIcon className="w-6 h-6" />
      },
      {
        id: 't-3',
        title: 'AI-Generated Assessments',
        description: 'Create tests instantly from your curriculum using Gemini-powered assessment tools.',
        icon: <SparklesIcon className="w-6 h-6" />
      },
      {
        id: 't-4',
        title: 'Digital Grading',
        description: 'Centralized evaluation portal with automated marksheet generation and trend analysis.',
        icon: <ClipboardDocumentCheckIcon className="w-6 h-6" />
      }
    ]
  },
  {
    type: 'STUDENT',
    label: 'Student',
    tagline: 'Learning Reimagined',
    description: 'A mobile-first experience designed to keep you on track with your academic goals.',
    features: [
      {
        id: 's-1',
        title: 'Lecture Archives',
        description: 'Access recorded lectures anytime. Never miss a concept with organized, searchable class content.',
        icon: <BookOpenIcon className="w-6 h-6" />
      },
      {
        id: 's-2',
        title: 'Personal Progress Tracker',
        description: 'Real-time view of your attendance percentages and internal academic performance scores.',
        icon: <PresentationChartBarIcon className="w-6 h-6" />
      },
      {
        id: 's-3',
        title: 'Online Evaluations',
        description: 'Participate in secure online tests and track your feedback with descriptive analytics.',
        icon: <ClipboardDocumentCheckIcon className="w-6 h-6" />
      },
      {
        id: 's-4',
        title: 'Career Readiness',
        description: 'Digital credentials and a record of academic achievements verified by your institution.',
        icon: <AcademicCapIcon className="w-6 h-6" />
      }
    ]
  }
];
