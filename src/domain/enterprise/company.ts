import { Entity } from '@/core/entity';
import { Plan } from '@prisma/client';
import { CreateUserInput } from './user';

export interface CompanyProps {
  name: string;
  document: string;
  logoUrl?: string;
  plan: Plan;
  createdAt: Date;
  updatedAt: Date;
}

export type Company = Entity<CompanyProps>;

export type CreateCompanyInput = Omit<CompanyProps, 'createdAt' | 'updatedAt'> & {
  user: CreateUserInput;
};
