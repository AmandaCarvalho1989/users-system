import { IUser } from "../types/User";
import { api } from "./api";
import base64 from "base-64";

const loadUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
const createUser = async (user: Omit<IUser, "id">) => {
  const formattedUser = {
    ...user,
    email: String(user.email).toLowerCase(),
    password: base64.encode(user.password),
  };
  const response = await api.post("/users", formattedUser);
  return response.data;
};
const updateUser = async (user: IUser) => {
  const formattedUser = {
    ...user,
    email: String(user.email).toLowerCase(),
    password: base64.encode(user.password),
  };
  const response = await api.patch(`/users/${user.id}`, formattedUser);
  return response.data;
};

const deleteUser = async (userId: number) => {
  await api.delete(`/users/${userId}`);
  return;
};

export { loadUsers, createUser, deleteUser, updateUser };
