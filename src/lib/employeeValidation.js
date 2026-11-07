export const validateEmployee = (values) => {
  const errors = {};

  if (!values.firstName?.trim()) {
    errors.firstName = "Nama wajib diisi";
  } else if (values.firstName.trim().length < 3) {
    errors.firstName = "Nama minimal 3 karakter";
  }

  if (!values.email?.trim()) {
    errors.email = "Email wajib diisi";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Format email tidak valid";
  }

  const age = Number(values.age);

  if (!values.age) {
    errors.age = "Usia wajib diisi";
  } else if (age < 18 || age > 65) {
    errors.age = "Usia harus antara 18-65 tahun";
  }

  if (!values.department) {
    errors.department = "Departemen wajib dipilih";
  }

  return errors;
};
