import { create } from "zustand";
import {
  createEmployeeApi,
  deleteEmployeeApi,
  getEmployeeDetailApi,
  getEmployeesApi,
  searchEmployeesApi,
  updateEmployeeApi,
} from "@/features/employee/api/employeeApi";

export const useEmployeeStore = create((set, get) => ({
  listEmployee: [],
  total: 0,
  page: 1,
  keyword: "",
  selectedDepartment: "all",
  selectedEmployee: null,
  editingEmployee: null,
  isFormOpen: false,
  isLoading: false,
  hasError: false,

  // Ambil list berdasarkan page & keyword (pakai endpoint search jika keyword terisi
  onGetListEmployee: async () => {
    const { page, keyword } = get();

    try {
      set({
        isLoading: true,
        hasError: false,
      });

      const response = keyword
        ? await searchEmployeesApi(keyword)
        : await getEmployeesApi({ page });

      set({
        listEmployee: response.users,
        total: response.total,
      });
    } catch (error) {
      set({ hasError: true });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Ambil detail dan simpan ke selectedEmployee
  onGetEmployeeDetail: async (id) => {
    try {
      set({
        isLoading: true,
        hasError: false,
      });

      // Jika id employee ada pada list employee, maka ambil dari situ
      const employeeInStore = get().listEmployee.find(
        (employee) => employee.id === id,
      );

      if (employeeInStore) {
        set({
          selectedEmployee: employeeInStore,
        });

        return;
      }

      const response = await getEmployeeDetailApi(id);

      set({
        selectedEmployee: response,
      });
    } catch (error) {
      set({ hasError: true });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Ubah halaman aktif
  onSetPage: (page) => {
    set({ page: Math.max(1, page) }); // Mencegah angka page dibawah 1
  },

  // Ubah keyword dan reset page ke 1
  onSetKeyword: (keyword) => {
    set({ keyword, page: 1 });
  },

  // Ubah filter departemen
  onSetSelectedDepartment: (dept) => {
    set({ selectedDepartment: dept });
  },

  // Buka dialog Tanpa argumen = mode tambah
  onOpenForm: (employee = null) => {
    /** 
        Jika employee = null (Mode tambah)
        Jika employee = Object (Mode edit)
    */
    set({
      isFormOpen: true,
      editingEmployee: employee,
    });
  },

  // Tutup dialog dan reset editingEmployee
  onCloseForm: () => {
    set({
      isFormOpen: false,
      editingEmployee: null,
    });
  },

  // Tambah data, sisipkan di awal listEmployee, total + 1
  onCreateEmployee: async (payload) => {
    try {
      set({ isLoading: true });

      const employee = await createEmployeeApi(payload);

      // Menggunakan callback state untuk mencegah race condition
      set((state) => ({
        listEmployee: [
          {
            ...employee,
          },
          ...state.listEmployee,
        ],
        total: state.total + 1,
      }));
    } catch (error) {
      set({ hasError: true });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Ubah data dan perbarui item di list
  onUpdateEmployee: async (id, payload) => {
    try {
      set({ isLoading: true });

      const employee = await updateEmployeeApi(id, payload);

      // Menggunakan callback state untuk mencegah race condition
      set((state) => ({
        listEmployee: state.listEmployee.map((item) =>
          item.id === id ? { ...item, ...employee } : item,
        ),
        selectedEmployee:
          state.selectedEmployee?.id === id
            ? {
                ...state.selectedEmployee,
                ...employee,
              }
            : state.selectedEmployee,
      }));
    } catch (error) {
      set({ hasError: true });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Hapus dengan optimistic update + rollback
  onDeleteEmployee: async (id) => {
    set({ isLoading: true });
    const recentEmployee = get().listEmployee;
    const recentTotal = get().total;

    try {
      // Optimistic update
      set((state) => ({
        listEmployee: state.listEmployee.filter(
          (employee) => employee.id !== id,
        ),
        total: state.total - 1,
      }));

      await deleteEmployeeApi(id);
    } catch (error) {
      // Rollback ke data sebelumnya
      set({
        listEmployee: recentEmployee,
        total: recentTotal,
      });

      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
