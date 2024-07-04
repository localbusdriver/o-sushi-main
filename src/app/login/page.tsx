"use server";
import { FC } from "react";
import LoginForms from "./components/login";

const LoginPage: FC = async () => {
  return (
    <div className="page">
      <LoginForms />
    </div>
  );
};

export default LoginPage;
