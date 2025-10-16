export interface ClinicStaff {
  id: string;
  name: string;
  role: 'doctor' | 'employee' | 'administrator';
  registrationNumber: string;
  specialty?: string;
  email: string;
  phone: string;
  hireDate: string;
  status: 'active' | 'inactive';
};