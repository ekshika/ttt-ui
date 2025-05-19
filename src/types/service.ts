import { ReactNode } from 'react';

export interface CaseStudy {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  featureDescriptions?: string[];
  longDescription?: string;
  benefits?: string[];
  caseStudies?: CaseStudy[];
  faq?: FaqItem[];
  detailedContent?: string;
}