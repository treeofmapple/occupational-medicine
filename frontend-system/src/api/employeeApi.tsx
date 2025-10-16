import { Employee } from "../model/Employee";

const BASE_API_URL = "http://127.0.0.1:8080";
const FUNCIONARIOS_ENDPOINT = "/funcionarios_cliente";

export const getEmployees = async (): Promise<Employee[]> => {
    const response = await fetch(`${BASE_API_URL}${FUNCIONARIOS_ENDPOINT}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch employees: ${response.statusText}`);
  }

  return response.json();
};

export const createEmployee = async (employeeData: Omit<Employee, 'id'>): Promise<Employee> => {
    const response = await fetch(`${BASE_API_URL}${FUNCIONARIOS_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create employee: ${response.statusText}`);
  }

  return response.json();
};