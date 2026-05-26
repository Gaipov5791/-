/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'RU' | 'KG' | 'EN' | 'CN';

export interface Sector {
  id: string;
  name: Record<Language, string>;
  icon: string; // lucide icon name
  description: Record<Language, string>;
}

export interface InvestmentProgram {
  id: string;
  title: Record<Language, string>;
  icon: string;
  description: Record<Language, string>;
  fullDetails?: Record<Language, string>;
}

export interface FAQ {
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export interface Partner {
  id: string;
  name: string;
  type: string;
}

export interface NewsItem {
  id: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  content: Record<Language, string>;
  date: string;
  image: string;
  views: number;
}

export interface ProjectItem {
  id: string;
  title: Record<Language, string>;
  sectorId: string;
  region: Record<Language, string>;
  description: Record<Language, string>;
  totalCost: number; // in SOM or USD
  fundingStage: Record<Language, string>;
  jobsCreated: number;
}

export interface FinancingApplication {
  id: string;
  companyName: string;
  inn: string;
  contactName: string;
  email: string;
  phone: string;
  sectorId: string;
  projectTitle: string;
  projectDescription: string;
  totalBudget: number;
  requestedFunding: number;
  expectedJobs: number;
  region: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  createdAt: string;
}
