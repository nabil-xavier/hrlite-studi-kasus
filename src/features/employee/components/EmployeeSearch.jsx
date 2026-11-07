import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useEmployeeStore } from "@/features/employee/store/useEmployeeStore";

const EmployeeSearch = () => {
  const keyword = useEmployeeStore((state) => state.keyword);
  const onSetKeyword = useEmployeeStore((state) => state.onSetKeyword);

  const [search, setSearch] = useState(keyword);
  const debouncedKeyword = useDebounce(search);

  useEffect(() => {
    if (debouncedKeyword !== keyword) {
      onSetKeyword(debouncedKeyword);
    }
  }, [debouncedKeyword, keyword, onSetKeyword]);

  return (
    <Input
      placeholder="Cari nama employee..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      className="max-w-sm"
    />
  );
};

export default EmployeeSearch;
