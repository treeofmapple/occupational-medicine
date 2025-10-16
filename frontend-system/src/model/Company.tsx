export interface Company {
  id: string;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  employeeCount: number;
  status: 'active' | 'inactive';
  registrationDate: string;
}