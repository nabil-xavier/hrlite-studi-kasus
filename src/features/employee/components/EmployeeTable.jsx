import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployeeStore } from "@/features/employee/store/useEmployeeStore";
import DeleteEmployeeDialog from "@/features/employee/components/DeleteEmployeeDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const EmployeeTable = () => {
  const navigate = useNavigate();

  const listEmployee = useEmployeeStore((state) => state.listEmployee);
  const total = useEmployeeStore((state) => state.total);
  const page = useEmployeeStore((state) => state.page);
  const onSetPage = useEmployeeStore((state) => state.onSetPage);
  const selectedDepartment = useEmployeeStore(
    (state) => state.selectedDepartment,
  );
  const onOpenForm = useEmployeeStore((state) => state.onOpenForm);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredEmployees = useMemo(() => {
    if (selectedDepartment === "all") {
      return listEmployee;
    }

    return listEmployee.filter(
      (employee) => employee.company?.department === selectedDepartment,
    );
  }, [listEmployee, selectedDepartment]);

  const totalPages = Math.ceil(total / 10);

  return (
    <>
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Departemen</TableHead>
              <TableHead>Posisi</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <img
                    src={employee.image}
                    alt={employee.firstName}
                    className="h-10 w-10 rounded-full"
                  />
                </TableCell>

                <TableCell>
                  {employee.firstName} {employee.lastName}
                </TableCell>

                <TableCell>{employee.email}</TableCell>

                <TableCell>{employee.company?.department}</TableCell>

                <TableCell>{employee.company?.title}</TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/employee/${employee.id}`)}
                    >
                      Detail
                    </Button>

                    <Button size="sm" onClick={() => onOpenForm(employee)}>
                      Ubah
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setIsDeleteOpen(true);
                      }}
                    >
                      Hapus
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => onSetPage(page - 1)}
          >
            Sebelumnya
          </Button>

          <span className="flex items-center px-2">
            {page} / {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => onSetPage(page + 1)}
          >
            Selanjutnya
          </Button>
        </div>
      </div>

      <DeleteEmployeeDialog
        employee={selectedEmployee}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </>
  );
};

export default EmployeeTable;
