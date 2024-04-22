import { CreateCompanyInput } from '@/domain/enterprise';
import { faker } from '@faker-js/faker';
import { makeUser } from './make-user';

export const makeCompany = (override: Partial<CreateCompanyInput>) => {
  const user = makeUser({
    isResponsible: true,
    admin: true,
  });

  const company: CreateCompanyInput = {
    document: faker.number.int({ min: 14, max: 14 }).toString(),
    name: faker.person.firstName(),
    plan: 'FREE',
    logoUrl: faker.internet.url(),
    user,
    ...override,
  };

  return company;
};
