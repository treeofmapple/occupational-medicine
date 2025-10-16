export interface Employee {
  id: string;
  name: string;
  cpf: string;
  dateOfBirth: string;
  company: string;
  position: string;
  department: string;
  admissionDate: string;
  status: 'active' | 'inactive';
}