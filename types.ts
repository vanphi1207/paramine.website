import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface StaffMember {
  id: string;
  name: string;
  role: 'Owner' | 'Admin' | 'Developer' | 'Moderator' | 'Builder' | 'Helper';
  description: string;
  avatarUrl: string; // URL to skin or placeholder
  contact?: string; // Discord handle
}

export interface WikiSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface WikiCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  sections: WikiSection[];
}

export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export type PageView = 'home' | 'wiki';