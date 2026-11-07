import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEmployeeStore } from "@/features/employee/store/useEmployeeStore";

const EmployeeDetail = () => {
  const { id } = useParams();

  const selectedEmployee = useEmployeeStore((state) => state.selectedEmployee);
  const isLoading = useEmployeeStore((state) => state.isLoading);
  const hasError = useEmployeeStore((state) => state.hasError);
  const onGetEmployeeDetail = useEmployeeStore(
    (state) => state.onGetEmployeeDetail,
  );

  useEffect(() => {
    if (id) {
      onGetEmployeeDetail(Number(id));
    }
  }, [id, onGetEmployeeDetail]);

  if (isLoading) {
    return <div>Memuat detail employee...</div>;
  }

  if (hasError || !selectedEmployee) {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-semibold">Employee tidak ditemukan</h2>

        <Button asChild>
          <Link to="/employee">Kembali ke Daftar Employee</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Detail Employee</h1>

        <Button asChild variant="outline">
          <Link to="/employee">Kembali</Link>
        </Button>
      </div>

      <div className="rounded-lg border p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <img
            src={selectedEmployee.image}
            alt={selectedEmployee.firstName}
            className="h-32 w-32 rounded-full border object-cover"
          />

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </h2>

              <p className="text-muted-foreground">{selectedEmployee.email}</p>
            </div>

            <div>
              <h3 className="font-medium">Data Pribadi</h3>
              <p>Umur: {selectedEmployee.age}</p>
              <p>Telepon: {selectedEmployee.phone}</p>
              <p>Gender: {selectedEmployee.gender}</p>
            </div>

            <div>
              <h3 className="font-medium">Alamat</h3>
              <p>{selectedEmployee.address?.address}</p>
              <p>
                {selectedEmployee.address?.city},{" "}
                {selectedEmployee.address?.state}
              </p>
            </div>

            <div>
              <h3 className="font-medium">Informasi Perusahaan</h3>
              <p>Departemen: {selectedEmployee.company?.department}</p>
              <p>Posisi: {selectedEmployee.company?.title}</p>
              <p>Perusahaan: {selectedEmployee.company?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
