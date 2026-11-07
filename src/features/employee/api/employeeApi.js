import { request } from "@/services/api";

export const getEmployeesApi = ({ page }) => {
  const limit = 10;
  const skip = (page - 1) * limit;

  return request(`/users?limit=${limit}&skip=${skip}`);
};

export const searchEmployeesApi = (keyword) => {
  return request(`/users/search?q=${keyword}`);
};

export const getEmployeeDetailApi = (id) => {
  return request(`/users/${id}`);
};

export const createEmployeeApi = (payload) => {
  return request("/users/add", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const updateEmployeeApi = (id, payload) => {
  return request(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const deleteEmployeeApi = (id) => {
  return request(`/users/${id}`, {
    method: "DELETE",
  });
};
