import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import EmployeeDetail from "@/features/employee/components/EmployeeDetail";
const EmployeePage = lazy(() => import("@/pages/EmployeePage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/employee" replace />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
