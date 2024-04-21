import { Company, CreateCompanyInput } from '../enterprise/company';

export interface CompaniesRepository {
  create(company: CreateCompanyInput): Promise<Company>;
  findByDocument(document: string): Promise<Company | null>;
}
