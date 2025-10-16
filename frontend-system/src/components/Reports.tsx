import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Users,
  Building2,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { getSeverityRisks } from "../api/estatistics/severityRisk";
import { getMonthExams } from "../api/estatistics/monthExams";
import { getCompanies } from "../api/companyApi";
import { getASOTrend } from "../api/estatistics/asoTrend";
import { getFitness } from "../api/estatistics/fitnessTrendApi";
import { Company } from "../model/Company";

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [risksByCategory, setRisksByCategory] = useState<any[]>([]);
  const [examsByMonth, setExamsByMonth] = useState<any[]>([]);
  const [asoTrend, setASOTrend] = useState<any[]>([]);
  const [fitnessTrend, setFitnessTrend] = useState<any[]>([]);
  const [companiesStats, setCompaniesStats] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companies, exams, aso, risks, fitness] = await Promise.all([
          getCompanies(),
          getMonthExams(),
          getASOTrend(),
          getSeverityRisks(),
          getFitness(),
        ]);

        setExamsByMonth(
          exams.map((e) => ({
            month: e.month,
            admission: e.admission,
            periodic: e.periodic,
            returnToWork: e.return_to_work,
            dismissal: e.dismissal,
          }))
        );

        setASOTrend(aso);
        setRisksByCategory(
          risks.map((r) => ({
            name: r.categoria,
            count: r.quantidade,
            percentage: r.porcentagem,
          }))
        );
        setFitnessTrend(fitness);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch report data.");
      }
    };

    fetchData();
  }, []);

  const summaryCards = [
    {
      title: "Total Employees",
      value: companiesStats.reduce((a, c) => a + c.employeeCount, 0).toString(),
      change: "+15 this month",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Exams This Month",
      value: examsByMonth
        .reduce(
          (a, m) => a + m.admission + m.periodic + m.returnToWork + m.dismissal,
          0
        )
        .toString(),
      change: "+12% from last month",
      trend: "up",
      icon: FileText,
      color: "bg-green-500",
    },
    {
      title: "Active Risks",
      value: risksByCategory.reduce((a, r) => a + r.count, 0).toString(),
      change: "-2 from last month",
      trend: "down",
      icon: AlertTriangle,
      color: "bg-orange-500",
    },
    {
      title: "ASOs Issued",
      value: asoTrend.reduce((a, t) => a + t.issued, 0).toString(),
      change: "+8% this month",
      trend: "up",
      icon: FileText,
      color: "bg-purple-500",
    },
  ];

  const generateReport = (type: string) => {
    toast.success(`${type} report generated successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Reports & Statistics
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive analytics and reporting for occupational health data
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {card.title}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {card.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp
                        className={`w-4 h-4 mr-1 ${
                          card.trend === "up"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      />
                      <span className="text-sm text-gray-600">
                        {card.change}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risks by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>
                {/* risks by category title could be added to translations */}
                Riscos por Categoria
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={risksByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Exams by Month */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tendência de Exames Médicos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={examsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="admission"
                  stackId="a"
                  fill="#3b82f6"
                  name="Admission"
                />
                <Bar
                  dataKey="periodic"
                  stackId="a"
                  fill="#10b981"
                  name="Periodic"
                />
                <Bar
                  dataKey="returnToWork"
                  stackId="a"
                  fill="#f59e0b"
                  name="Return to Work"
                />
                <Bar
                  dataKey="dismissal"
                  stackId="a"
                  fill="#ef4444"
                  name="Dismissal"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ASO Issuance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Emissão de ASO</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={asoTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="issued"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Issued"
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Pending"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fitness Results Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Resultados de Aptidão para Trabalho</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={fitnessTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="fit" fill="#10b981" name="Fit" />
                <Bar
                  dataKey="fitWithRestrictions"
                  fill="#f59e0b"
                  name="Fit with Restrictions"
                />
                <Bar dataKey="unfit" fill="#ef4444" name="Unfit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Geração Rápida de Relatórios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => generateReport("Monthly Compliance")}
              className="h-16"
            >
              <div className="text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                <span>
                  {/* {pt['reports.monthlyCompliance']} */}Relatório de
                  Conformidade Mensal
                </span>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => generateReport("Risk Assessment")}
              className="h-16"
            >
              <div className="text-center">
                <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                <span>
                  {/* {pt['reports.riskAssessment']} */}Relatório de Avaliação
                  de Risco
                </span>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => generateReport("ASO Summary")}
              className="h-16"
            >
              <div className="text-center">
                <FileText className="w-6 h-6 mx-auto mb-2" />
                <span>{/* {pt['reports.asoSummary']} */}Resumo de ASO</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
