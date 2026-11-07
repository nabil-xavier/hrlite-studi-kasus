import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import EmployeeTable from "@/features/employee/components/EmployeeTable";
import EmployeeFormDialog from "@/features/employee/components/EmployeeFormDialog";
import DeleteEmployeeDialog from "@/features/employee/components/DeleteEmployeeDialog";
import ErrorState from "@/features/employee/components/ErrorState";
import EmployeeTableSkeleton from "@/features/employee/components/EmployeeTableSkeleton";
import EmployeeFilter from "@/features/employee/components/EmployeeFilter";
import EmployeeSearch from "@/features/employee/components/EmployeeSearch";
import EmptyState from "@/features/employee/components/EmptyState";
import { useEmployeeStore } from "@/features/employee/store/useEmployeeStore";

const Employee = () => {
  const listEmployee = useEmployeeStore((state) => state.listEmployee);
  const isLoading = useEmployeeStore((state) => state.isLoading);
  const hasError = useEmployeeStore((state) => state.hasError);
  const page = useEmployeeStore((state) => state.page);
  const keyword = useEmployeeStore((state) => state.keyword);
  const onGetListEmployee = useEmployeeStore(
    (state) => state.onGetListEmployee,
  );
  const { onOpenForm } = useEmployeeStore(
    useShallow((state) => ({
      onOpenForm: state.onOpenForm,
    })),
  );

  useEffect(() => {
    onGetListEmployee();
  }, [page, keyword, onGetListEmployee]);

  // Saat loading
  if (isLoading) {
    return <EmployeeTableSkeleton />;
  }

  // Saat error
  if (hasError) {
    return <ErrorState onRetry={onGetListEmployee} />;
  }

  // Saat data kosong
  if (!listEmployee.length) {
    return <EmptyState onAction={onOpenForm} />;
  }

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <EmployeeSearch />
        <EmployeeFilter />
      </div>

      <EmployeeTable />
      <EmployeeFormDialog />
      <DeleteEmployeeDialog />
    </>
  );
};

export default Employee;
