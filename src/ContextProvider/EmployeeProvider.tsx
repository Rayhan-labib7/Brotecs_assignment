import { createContext, useContext, useState, ReactNode } from "react";// Import initial data
import { tableData, TableData } from "../global";

interface EmployeeContextType {
  employees: TableData[];
  addEmployee: (employee: TableData) => void;
  updateEmployee: ( updatedEmployee: TableData) => void;
  deleteEmployee: (id: number) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<TableData[]>(tableData);

  // Add a new employee
  const addEmployee = (employee: TableData) => {
    setEmployees((prev) => [employee,  ...prev]);
  };

  // Update an employee
  const updateEmployee = (updatedEmployee: TableData) => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
  };
  // const updateEmployee = (updatedEmployee: TableData) => {
  //   setEmployeeData((prev) =>
  //     prev.map((employee) =>
  //       employee.id === updatedEmployee.id ? updatedEmployee : employee
  //     )
  //   ); // Updates existing employee by ID
  // };

  // Delete an employee
  const deleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

// Custom hook to use EmployeeContext
export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error("useEmployee must be used within an EmployeeProvider");
  return context;
};
