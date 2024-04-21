import { UniqueEntityID } from './unique-entity-id';

export type Entity<Props> = {
  id: UniqueEntityID['id'];
} & Props;
