import { IUser } from "../types/User";
import { api } from "./api";

const loadUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
const createUser = async (user: IUser) => {
  const response = await api.post("/users", user);
  return response.data;
};

const deleteUser = async (userId: number) => {
  await api.delete(`/users/${userId}`);
  return;
};

export { loadUsers, createUser ,deleteUser};
