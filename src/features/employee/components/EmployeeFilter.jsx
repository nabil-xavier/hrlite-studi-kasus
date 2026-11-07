import { useMemo } from "react";
import { useEmployeeStore } from "@/features/employee/store/useEmployeeStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EmployeeFilter = () => {
  const listEmployee = useEmployeeStore((state) => state.listEmployee);
  const selectedDepartment = useEmployeeStore(
    (state) => state.selectedDepartment,
  );
  const onSetSelectedDepartment = useEmployeeStore(
    (state) => state.onSetSelectedDepartment,
  );

  const departments = useMemo(() => {
    const uniqueDepartments = [
      ...new Set(
        listEmployee
          .map((employee) => employee.company?.department)
          .filter(Boolean),
      ),
    ];

    return uniqueDepartments;
  }, [listEmployee]);

  return (
    <Select value={selectedDepartment} onValueChange={onSetSelectedDepartment}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Pilih Departemen" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">Semua Departemen</SelectItem>

        {departments.map((department) => (
          <SelectItem key={department} value={department}>
            {department}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default EmployeeFilter;
