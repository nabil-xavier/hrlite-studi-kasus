import { useEffect, useState } from "react";
import { useEmployeeStore } from "@/features/employee/store/useEmployeeStore";
import { validateEmployee } from "@/lib/employeeValidation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EMPLOYEE_DEPARTMENTS } from "@/lib/constants";

function EmployeeFormDialog() {
  const isFormOpen = useEmployeeStore((state) => state.isFormOpen);
  const editingEmployee = useEmployeeStore((state) => state.editingEmployee);
  const onCloseForm = useEmployeeStore((state) => state.onCloseForm);
  const onCreateEmployee = useEmployeeStore((state) => state.onCreateEmployee);
  const onUpdateEmployee = useEmployeeStore((state) => state.onUpdateEmployee);

  const [form, setForm] = useState({
    firstName: "",
    email: "",
    age: "",
    department: "",
  });
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(editingEmployee);

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        firstName: editingEmployee.firstName ?? "",
        email: editingEmployee.email ?? "",
        age: editingEmployee.age ?? "",
        department: editingEmployee.company?.department ?? "",
      });

      return;
    }

    setForm({
      firstName: "",
      email: "",
      age: "",
      department: "",
    });
  }, [editingEmployee]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateEmployee(form);

    // Jika terdapat error pada objek form, set error dan hentikan proses submit
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      firstName: form.firstName,
      email: form.email,
      age: Number(form.age),
      company: {
        department: form.department,
      },
    };

    try {
      if (isEditMode) {
        await onUpdateEmployee(editingEmployee.id, payload);
      } else {
        await onCreateEmployee(payload);
      }

      onCloseForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={isFormOpen}
      onOpenChange={(open) => {
        if (!open) {
          onCloseForm();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Update Employee" : "Add Employee"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Nama Lengkap"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />

            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Usia"
              value={form.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />

            {errors.age && (
              <p className="mt-1 text-sm text-red-500">{errors.age}</p>
            )}
          </div>

          <div>
            <Select
              value={form.department}
              onValueChange={(value) => handleChange("department", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Departemen" />
              </SelectTrigger>

              <SelectContent>
                {EMPLOYEE_DEPARTMENTS.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.department && (
              <p className="mt-1 text-sm text-red-500">{errors.department}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {isEditMode ? "Update Employee" : "Tambah Employee"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeFormDialog;
