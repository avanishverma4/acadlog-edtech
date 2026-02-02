
import { ReactNode } from 'react';

export type PersonaType = 'SUPER_ADMIN' | 'COLLEGE_ADMIN' | 'TEACHER' | 'STUDENT';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface PersonaData {
  type: PersonaType;
  label: string;
  tagline: string;
  description: string;
  features: Feature[];
}

export interface Institution {
  id: string;
  name: string;
  location: string;
  adminName: string;
  adminEmail: string;
  status: 'active' | 'pending' | 'suspended';
  studentCount: number;
  tier: 'starter' | 'pro' | 'university';
}
