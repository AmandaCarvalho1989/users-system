import React from "react";
import { render, screen } from "@testing-library/react";
import { IUser } from "../../types/User";

import Users from "../../pages/users";

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        route: "/users",
      };
    },
  };
});

jest.mock("../../hooks/auth", () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
      user: {
        id: 2,
        firstName: "Gallegos",
        lastName: "Hopkins",
        birthDate: "24-10-1996",
        email: "gallegos@hopkins.com",
        document: "28453844089",
        password: "MTIzNDU2",
        role: "USER",
      },
    }),
  };
});

jest.mock("../../services/api");

const users: IUser[] = [
  {
    id: 1,
    firstName: "Thomas",
    lastName: "Hudson",
    birthDate: "24-12-1989",
    email: "thomas.hudson@gmail.com",
    document: "52254883070",
    password: "MTIzNDU2",
    role: "ADMIN",
  },
  {
    id: 2,
    firstName: "Gallegos",
    lastName: "Hopkins",
    birthDate: "24-10-1996",
    email: "gallegos@hopkins.com",
    document: "28453844089",
    password: "MTIzNDU2",
    role: "USER",
  },
];

describe("Users Page", () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it("should render correctly when users data are empty", async () => {
    render(<Users users={[]} status={500} />);

    expect(screen.getByText("Opss, houve um erro")).toBeInTheDocument();
  });
  it(" should render correctly when users data are loading", async () => {
    render(<Users users={users} status={200} />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });
  it("should  render the action button when user is ADMIN", async () => {
    render(<Users users={users} status={200} />);

    expect(screen.getByText("Criar usuário")).toBeInTheDocument();
  });
});
