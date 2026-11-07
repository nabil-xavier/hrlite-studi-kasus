import { Button } from "@/components/ui/button";

const ErrorState = ({ onRetry }) => {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h2 className="font-semibold">Gagal Memuat Data</h2>

        <p className="text-sm text-muted-foreground">
          Terjadi kesalahan saat mengambil data employee
        </p>
      </div>

      <Button onClick={onRetry}>Coba Lagi</Button>
    </div>
  );
};

export default ErrorState;
