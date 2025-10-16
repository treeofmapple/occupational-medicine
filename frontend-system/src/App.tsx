import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { CompanyRegistration } from './components/CompanyRegistration';
import { ClientEmployeeRegistration } from './components/ClientEmployeeRegistration';
import { ClinicStaffRegistration } from './components/ClinicStaffRegistration';
import { MedicalExams } from './components/MedicalExams';
import { ASOIssuance } from './components/ASOIssuance';
import { OccupationalRisks } from './components/OccupationalRisks';
import { Reports } from './components/Reports';
import { Layout } from './components/Layout';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'employee';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
const mockUsers: User[] = [
  { id: '1', name: 'Dr. Maria Silva', email: 'admin@clinic.com', role: 'admin' },
  { id: '2', name: 'Dr. João Santos', email: 'doctor@clinic.com', role: 'doctor' },
  { id: '3', name: 'Ana Costa', email: 'employee@clinic.com', role: 'employee' },
];

function AuthProvider({ children }: { children: React.ReactNode }) {
  // Persist user in localStorage so page reloads keep the session for demo
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? (JSON.parse(raw) as User) : null;
    } catch (e) {
      return null;
    }
  });

  const login = (email: string, password: string): boolean => {
    // Simple mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      try { localStorage.setItem('auth_user', JSON.stringify(foundUser)); } catch {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    try { localStorage.removeItem('auth_user'); } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: User['role'][] }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If authenticated but not authorized, redirect to dashboard (or show a message)
    return <Navigate to="/dashboard" replace />;
  }

  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/companies" element={
              <ProtectedRoute allowedRoles={["admin","employee"]}>
                <CompanyRegistration />
              </ProtectedRoute>
            } />
            <Route path="/employees/client" element={
              <ProtectedRoute allowedRoles={["admin","employee"]}>
                <ClientEmployeeRegistration />
              </ProtectedRoute>
            } />
            <Route path="/employees/clinic" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ClinicStaffRegistration />
              </ProtectedRoute>
            } />
            <Route path="/exams" element={
              <ProtectedRoute allowedRoles={["admin","doctor"]}>
                <MedicalExams />
              </ProtectedRoute>
            } />
            <Route path="/aso" element={
              <ProtectedRoute allowedRoles={["admin","doctor"]}>
                <ASOIssuance />
              </ProtectedRoute>
            } />
            <Route path="/risks" element={
              <ProtectedRoute allowedRoles={["admin","doctor"]}>
                <OccupationalRisks />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={["admin","doctor","employee"]}>
                <Reports />
              </ProtectedRoute>
            } />
            {/* Catch-all route for unmatched URLs */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}