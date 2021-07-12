import React from "react";
import { render } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/auth";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        route: "/users",
      };
    },
  };
});

jest.mock("../../hooks/auth");

describe("Header component", () => {
  it("should be able to render the header", () => {
    const useAuthMocked = mocked(useAuth);

    useAuthMocked.mockReturnValueOnce({
      user: {
        id: 1,
        firstName: "Thomas",
        lastName: "Hudson",
        birthDate: "24-12-1989",
        email: "thomas.hudson@gmail.com",
        document: "52254883070",
        password: "MTIzNDU2",
        role: "ADMIN",
      },
    } as any);
    const { getByText } = render(<Header />);

    const role = getByText("ADMIN");

    expect(role).toBeInTheDocument();
  });
});
