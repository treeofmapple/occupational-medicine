import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useAuth } from '../App';
import pt from '../i18n/pt-BR';
import {
  Building2,
  Users,
  ClipboardList,
  AlertTriangle,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();

  const statsCards = [
    {
      title: 'Total Companies',
      value: '24',
      change: '+2 this month',
      icon: Building2,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Employees',
      value: '1,248',
      change: '+15 this week',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Exams',
      value: '87',
      change: '-5 from yesterday',
      icon: ClipboardList,
      color: 'bg-orange-500'
    },
    {
      title: 'High Risk Cases',
      value: '12',
      change: 'Needs attention',
      icon: AlertTriangle,
      color: 'bg-red-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'exam',
      description: 'Periodic exam completed for João Silva (TechCorp)',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'aso',
      description: 'ASO issued for Maria Santos (InnovaCorp)',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'risk',
      description: 'New occupational risk identified at BuildCorp',
      time: '6 hours ago',
      status: 'pending'
    },
    {
      id: 4,
      type: 'employee',
      description: 'New employee registered: Ana Costa (TechCorp)',
      time: '8 hours ago',
      status: 'completed'
    },
    {
      id: 5,
      type: 'exam',
      description: 'Admission exam scheduled for Carlos Lima',
      time: '1 day ago',
      status: 'scheduled'
    }
  ];

  const upcomingExams = [
    {
      id: 1,
      employee: 'Pedro Oliveira',
      company: 'TechCorp',
      type: 'Periodic',
      date: '2024-01-15',
      time: '09:00'
    },
    {
      id: 2,
      employee: 'Julia Santos',
      company: 'InnovaCorp',
      type: 'Admission',
      date: '2024-01-15',
      time: '10:30'
    },
    {
      id: 3,
      employee: 'Roberto Silva',
      company: 'BuildCorp',
      type: 'Return to Work',
      date: '2024-01-16',
      time: '14:00'
    },
    {
      id: 4,
      employee: 'Fernanda Costa',
      company: 'TechCorp',
      type: 'Periodic',
      date: '2024-01-16',
      time: '15:30'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-semibold mb-2">
          {pt['dashboard.welcome'].replace('{name}', user?.name || '')}
        </h1>
        <p className="text-blue-100">
          {pt['dashboard.subtitle']}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                  <div className="flex-shrink-0 mt-1">
                    {activity.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : activity.status === 'pending' ? (
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 mb-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                  <Badge 
                    variant={activity.status === 'completed' ? 'default' : 
                            activity.status === 'pending' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Upcoming Exams</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {exam.employee}
                    </p>
                    <p className="text-xs text-gray-500">
                      {exam.company} • {exam.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(exam.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {exam.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}