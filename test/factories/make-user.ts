import { UniqueEntityID } from '@/core/unique-entity-id';
import { User, UserProps } from '@/domain/enterprise/user';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'node:crypto';

export const makeUser = (override: Partial<UserProps> = {}, id?: UniqueEntityID['id']) => {
  const user: User = {
    id: id ?? randomUUID(),
    companyId: randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isResponsible: faker.datatype.boolean(),
    admin: faker.datatype.boolean(),
    costPerHour: faker.number.float(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    ...override,
  };

  return user;
};
