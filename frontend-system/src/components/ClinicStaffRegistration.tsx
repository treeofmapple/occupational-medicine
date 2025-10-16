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
import { Plus, UserCheck, Users, Stethoscope, Edit, Trash2, Search, Award } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../App';
import pt from '../i18n/pt-BR';

interface ClinicStaff {
  id: string;
  name: string;
  role: 'doctor' | 'nurse' | 'technician' | 'administrator';
  registrationNumber: string;
  specialty?: string;
  email: string;
  phone: string;
  hireDate: string;
  status: 'active' | 'inactive';
}

export function ClinicStaffRegistration() {
  const { user } = useAuth();
  
  // Only allow admin access
  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="p-6 text-center">
          <CardContent>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{pt['access.restrictedTitle'] || 'Acesso restrito'}</h3>
            <p className="text-gray-600">{pt['access.restrictedMessage'] || 'Apenas administradores podem acessar o registro de equipe da clínica.'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [staff] = useState<ClinicStaff[]>([
    {
      id: '1',
      name: 'Dr. Maria Silva',
      role: 'doctor',
      registrationNumber: 'CRM-SP 123456',
      specialty: 'Occupational Medicine',
      email: 'admin@clinic.com',
      phone: '(11) 99999-0001',
      hireDate: '2020-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Dr. João Santos',
      role: 'doctor',
      registrationNumber: 'CRM-RJ 789012',
      specialty: 'Occupational Medicine',
      email: 'doctor@clinic.com',
      phone: '(21) 99999-0002',
      hireDate: '2021-03-20',
      status: 'active'
    },
    {
      id: '3',
      name: 'Enfª. Ana Costa',
      role: 'nurse',
      registrationNumber: 'COREN-SP 345678',
      email: 'ana.costa@clinic.com',
      phone: '(11) 99999-0003',
      hireDate: '2021-06-10',
      status: 'active'
    },
    {
      id: '4',
      name: 'Carlos Lima',
      role: 'technician',
      registrationNumber: 'CRT-SP 901234',
      email: 'carlos.lima@clinic.com',
      phone: '(11) 99999-0004',
      hireDate: '2022-02-01',
      status: 'active'
    },
    {
      id: '5',
      name: 'Fernanda Oliveira',
      role: 'administrator',
      registrationNumber: 'ADM-001',
      email: 'fernanda.oliveira@clinic.com',
      phone: '(11) 99999-0005',
      hireDate: '2020-08-15',
      status: 'active'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    registrationNumber: '',
    specialty: '',
    email: '',
    phone: ''
  });

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Staff member registered successfully!');
    setIsDialogOpen(false);
    setFormData({
      name: '',
      role: '',
      registrationNumber: '',
      specialty: '',
      email: '',
      phone: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'doctor':
        return <Stethoscope className="w-4 h-4" />;
      case 'nurse':
        return <UserCheck className="w-4 h-4" />;
      case 'technician':
        return <Award className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'doctor':
        return 'bg-blue-100 text-blue-800';
      case 'nurse':
        return 'bg-green-100 text-green-800';
      case 'technician':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{pt['nav.clinicStaff']}</h1>
          <p className="text-gray-600 mt-1">{pt['clinic.description'] || 'Gerencie profissionais e membros da equipe da clínica'}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              {pt['clinic.newStaff'] || 'Novo membro da equipe'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{pt['clinic.registerTitle'] || 'Registrar novo membro da equipe'}</DialogTitle>
              <DialogDescription>
                {pt['clinic.registerDescription'] || 'Adicione um novo profissional à equipe da clínica.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="staff-name">{pt['clinic.fields.name'] || 'Nome completo'}</Label>
                <Input
                  id="staff-name"
                  placeholder={pt['clinic.fields.name']}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">{pt['clinic.fields.role'] || 'Função'}</Label>
                <Select value={formData.role} onValueChange={(value: string) => handleInputChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={pt['clinic.fields.role'] || 'Selecione a função'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="technician">Technician</SelectItem>
                    <SelectItem value="administrator">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="registration">{pt['clinic.fields.registration'] || 'Registro profissional'}</Label>
                <Input
                  id="registration"
                  placeholder={pt['clinic.fields.registration']}
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  required
                />
              </div>
              {formData.role === 'doctor' && (
                <div className="space-y-2">
                  <Label htmlFor="specialty">{pt['clinic.fields.specialty'] || 'Especialidade médica'}</Label>
                  <Input
                    id="specialty"
                    placeholder={pt['clinic.fields.specialty']}
                    value={formData.specialty}
                    onChange={(e) => handleInputChange('specialty', e.target.value)}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="staff-email">Email</Label>
                <Input
                  id="staff-email"
                  type="email"
                  placeholder={pt['login.placeholderEmail']}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staff-phone">{pt['clinic.fields.phone'] || 'Telefone'}</Label>
                <Input
                  id="staff-phone"
                  placeholder={pt['clinic.fields.phone']}
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
                  {pt['clinic.registerButton'] || 'Registrar Membro'}
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
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Doctors</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {staff.filter(s => s.role === 'doctor').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Nurses</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {staff.filter(s => s.role === 'nurse').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Technicians</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {staff.filter(s => s.role === 'technician').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{pt['clinic.totalStaff'] || 'Total de Equipe'}</p>
                <p className="text-2xl font-semibold text-gray-900">{staff.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={pt['clinic.searchPlaceholder'] || 'Pesquisar equipe por nome, função ou registro...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Clinic Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Registration</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Hire Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          {member.specialty && (
                            <p className="text-sm text-gray-500">{member.specialty}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(member.role)}>
                        <span className="flex items-center space-x-1">
                          {getRoleIcon(member.role)}
                          <span className="capitalize">{member.role}</span>
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {member.registrationNumber}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">{member.email}</p>
                        <p className="text-sm text-gray-500">{member.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(member.hireDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={member.status === 'active' ? 'default' : 'secondary'}
                        className={member.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {member.status}
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