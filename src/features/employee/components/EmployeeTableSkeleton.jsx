import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EmployeeTableSkeleton = () => {
  return (
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
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-10 w-10 rounded-full" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-48" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-28" />
              </TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-12" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

export default EmployeeTableSkeleton;
