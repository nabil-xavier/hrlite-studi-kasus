import { useEmployeeStore } from "@/features/employee/store/useEmployeeStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeleteEmployeeDialog = ({ employee, open, onOpenChange }) => {
  const onDeleteEmployee = useEmployeeStore((state) => state.onDeleteEmployee);

  const handleDelete = async () => {
    try {
      await onDeleteEmployee(employee.id);
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Employee</AlertDialogTitle>

          <AlertDialogDescription>
            Apakah Anda ingin menghapus{" "}
            <span className="font-medium">
              {employee?.firstName} {employee?.lastName}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete} className="bg-destructive">
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEmployeeDialog;
