export interface MedicalExam {
  id: string;
  employee: string;
  company: string;
  type: 'admission' | 'periodic' | 'return_to_work' | 'dismissal';
  date: string;
  time: string;
  doctor: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  result?: 'fit' | 'unfit' | 'fit_with_restrictions';
  observations?: string;
};