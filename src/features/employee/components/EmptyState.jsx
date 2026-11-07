import { Button } from "@/components/ui/button";

function EmptyState({ onAction, actionLabel = "Tambah Employee" }) {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">Tidak Ada Employee</h2>

        <p className="text-sm text-muted-foreground">
          Belum ada data employee untuk ditampilkan.
        </p>
      </div>

      <Button onClick={onAction}>{actionLabel}</Button>
    </div>
  );
}

export default EmptyState;
