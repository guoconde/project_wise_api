import { Entity } from '@/core/entity';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  admin: boolean;
  costPerHour: number;
  createdAt: Date;
  updatedAt: Date;
  isResponsible: boolean;
  companyId: string;
}

export type User = Entity<UserProps>;

export type CreateUserInput = Omit<UserProps, 'createdAt' | 'updatedAt' | 'costPerHour'> & {
  costPerHour?: number;
};
