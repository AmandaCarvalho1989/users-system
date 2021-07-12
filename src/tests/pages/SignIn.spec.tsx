import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import SignIn from "../../pages/signin";

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        route: "/signin",
      };
    },
  };
});

jest.mock("../../hooks/auth", () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

describe("SignIn Page", () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it("should be able to sign in", async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("Email");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Entrar");

    fireEvent.change(emailField, {
      target: { value: "thomas.hudson@gmail.com" },
    });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    await waitFor(() => expect(mockedHistoryPush).not.toBe("/signin"));
  });

  it("should not be able to sign in with invalid credentials", async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("Email");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Entrar");

    fireEvent.change(emailField, { target: { value: "not-valid-email" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    await waitFor(() =>
      expect(mockedHistoryPush).not.toHaveBeenCalledWith("/")
    );
  });

  it("should display an error if login fails", async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("Email");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Entrar");

    fireEvent.change(emailField, { target: { value: "johndoe@example.com" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    expect(mockedHistoryPush).not.toHaveBeenCalledWith("/");
  });
});
