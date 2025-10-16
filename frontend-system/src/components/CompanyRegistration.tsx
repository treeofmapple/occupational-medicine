import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Building2, Users, Phone, MapPin, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import pt from '../i18n/pt-BR';

interface Company {
  id: string;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  employeeCount: number;
  status: 'active' | 'inactive';
  registrationDate: string;
}

export function CompanyRegistration() {
  const [companies] = useState<Company[]>([
    {
      id: '1',
      name: 'TechCorp Solutions',
      cnpj: '12.345.678/0001-90',
      address: 'Av. Paulista, 1000 - São Paulo, SP',
      phone: '(11) 3000-1000',
      employeeCount: 150,
      status: 'active',
      registrationDate: '2023-01-15'
    },
    {
      id: '2',
      name: 'InnovaCorp Industries',
      cnpj: '98.765.432/0001-10',
      address: 'Rua das Flores, 500 - Rio de Janeiro, RJ',
      phone: '(21) 2000-2000',
      employeeCount: 85,
      status: 'active',
      registrationDate: '2023-03-22'
    },
    {
      id: '3',
      name: 'BuildCorp Construction',
      cnpj: '11.222.333/0001-44',
      address: 'Rua dos Operários, 250 - Belo Horizonte, MG',
      phone: '(31) 4000-4000',
      employeeCount: 220,
      status: 'active',
      registrationDate: '2023-02-10'
    },
    {
      id: '4',
      name: 'GreenCorp Sustentável',
      cnpj: '55.666.777/0001-88',
      address: 'Av. Ecológica, 800 - Curitiba, PR',
      phone: '(41) 5000-5000',
      employeeCount: 45,
      status: 'inactive',
      registrationDate: '2023-05-18'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    address: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Company registered successfully!');
    setIsDialogOpen(false);
    setFormData({ name: '', cnpj: '', address: '', phone: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{pt['nav.companies']}</h1>
          <p className="text-gray-600 mt-1">{pt['companies.description'] || 'Gerencie empresas clientes e suas informações'}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              {pt['companies.new'] || 'Nova Empresa'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{pt['companies.registerTitle'] || 'Registrar nova empresa'}</DialogTitle>
              <DialogDescription>
                {pt['companies.registerDescription'] || 'Adicione uma nova empresa cliente ao sistema. Todos os campos são obrigatórios.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">{pt['companies.fields.name'] || 'Razão Social'}</Label>
                <Input
                  id="company-name"
                  placeholder={pt['companies.fields.name']}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  placeholder={pt['companies.fields.cnpj'] || '00.000.000/0000-00'}
                  value={formData.cnpj}
                  onChange={(e) => handleInputChange('cnpj', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{pt['companies.fields.address'] || 'Endereço'}</Label>
                <Input
                  id="address"
                  placeholder={pt['companies.fields.address']}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{pt['companies.fields.phone'] || 'Telefone'}</Label>
                <Input
                  id="phone"
                  placeholder={pt['companies.fields.phone']}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {pt['common.cancel'] || 'Cancelar'}
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {pt['companies.registerButton'] || 'Registrar Empresa'}
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
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{pt['stats.totalCompanies']}</p>
                <p className="text-2xl font-semibold text-gray-900">{companies.length}</p>
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
                <p className="text-sm font-medium text-gray-600">{pt['stats.activeEmployees']}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {companies.reduce((sum, company) => sum + company.employeeCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Companies</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {companies.filter(c => c.status === 'active').length}
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
                <p className="text-sm font-medium text-gray-600">Inactive Companies</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {companies.filter(c => c.status === 'inactive').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Companies Table */}
      <Card>
        <CardHeader>
          <CardTitle>{pt['companies.registerTitle']}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{company.name}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {company.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{company.cnpj}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-3 h-3 mr-1" />
                        {company.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{company.employeeCount}</span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={company.status === 'active' ? 'default' : 'secondary'}
                        className={company.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {company.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(company.registrationDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
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