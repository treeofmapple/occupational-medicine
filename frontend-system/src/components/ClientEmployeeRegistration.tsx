import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Plus, Users, Building2, Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import pt from '../i18n/pt-BR';

interface Employee {
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

export function ClientEmployeeRegistration() {
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: 'João Silva Santos',
      cpf: '123.456.789-00',
      dateOfBirth: '1985-05-15',
      company: 'TechCorp Solutions',
      position: 'Software Developer',
      department: 'IT',
      admissionDate: '2023-01-10',
      status: 'active'
    },
    {
      id: '2',
      name: 'Maria Oliveira Costa',
      cpf: '987.654.321-00',
      dateOfBirth: '1990-08-22',
      company: 'InnovaCorp Industries',
      position: 'Project Manager',
      department: 'Operations',
      admissionDate: '2023-02-15',
      status: 'active'
    },
    {
      id: '3',
      name: 'Pedro Henrique Lima',
      cpf: '456.789.123-00',
      dateOfBirth: '1988-12-03',
      company: 'BuildCorp Construction',
      position: 'Civil Engineer',
      department: 'Engineering',
      admissionDate: '2023-03-01',
      status: 'active'
    },
    {
      id: '4',
      name: 'Ana Paula Ferreira',
      cpf: '789.123.456-00',
      dateOfBirth: '1992-03-18',
      company: 'TechCorp Solutions',
      position: 'UX Designer',
      department: 'Design',
      admissionDate: '2023-04-12',
      status: 'active'
    },
    {
      id: '5',
      name: 'Carlos Roberto Souza',
      cpf: '321.654.987-00',
      dateOfBirth: '1987-09-25',
      company: 'GreenCorp Sustentável',
      position: 'Environmental Analyst',
      department: 'Environment',
      admissionDate: '2023-01-20',
      status: 'inactive'
    }
  ]);

  const companies = [
    'TechCorp Solutions',
    'InnovaCorp Industries',
    'BuildCorp Construction',
    'GreenCorp Sustentável'
  ];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    dateOfBirth: '',
    company: '',
    position: '',
    department: ''
  });

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Employee registered successfully!');
    setIsDialogOpen(false);
    setFormData({
      name: '',
      cpf: '',
      dateOfBirth: '',
      company: '',
      position: '',
      department: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{pt['nav.clientEmployees']}</h1>
          <p className="text-gray-600 mt-1">{pt['clients.description'] || 'Gerencie funcionários de empresas clientes'}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              {pt['clients.newEmployee'] || 'Novo Funcionário'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{pt['clients.registerTitle'] || 'Registrar novo funcionário'}</DialogTitle>
              <DialogDescription>
                {pt['clients.registerDescription'] || 'Adicione um novo funcionário de uma empresa cliente ao sistema.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="employee-name">{pt['clients.fields.name'] || 'Nome completo'}</Label>
                <Input
                  id="employee-name"
                  placeholder={pt['clients.fields.name']}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder={pt['clients.fields.cpf'] || '000.000.000-00'}
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-birth">{pt['clients.fields.dob'] || 'Data de nascimento'}</Label>
                <Input
                  id="date-birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select value={formData.company} onValueChange={(value: string) => handleInputChange('company', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={pt['clients.selectCompanyPlaceholder'] || 'Selecione a empresa'} />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company} value={company}>
                        {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">{pt['clients.fields.position'] || 'Cargo'}</Label>
                <Input
                  id="position"
                  placeholder={pt['clients.fields.position']}
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">{pt['clients.fields.department'] || 'Departamento'}</Label>
                <Input
                  id="department"
                  placeholder={pt['clients.fields.department']}
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {pt['common.cancel'] || 'Cancelar'}
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {pt['clients.registerButton'] || 'Registrar Funcionário'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{pt['stats.activeEmployees']}</p>
                <p className="text-2xl font-semibold text-gray-900">{employees.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Employees</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {employees.filter(e => e.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Companies</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {new Set(employees.map(e => e.company)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{pt['clients.newThisMonth'] || 'Novos este mês'}</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={pt['clients.searchPlaceholder'] || 'Pesquisar funcionários por nome, empresa ou cargo...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Client Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Admission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {employee.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-500">
                            Born: {new Date(employee.dateOfBirth).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{employee.cpf}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{employee.company}</p>
                        <p className="text-sm text-gray-500">{employee.department}</p>
                      </div>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      {new Date(employee.admissionDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={employee.status === 'active' ? 'default' : 'secondary'}
                        className={employee.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}