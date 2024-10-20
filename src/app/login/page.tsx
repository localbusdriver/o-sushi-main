"use client";

import { useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage: FC = () => {
  return (
    <div className="page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

const LoginForm: FC = () => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const resultRef = useRef<HTMLSpanElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await fetch("api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        password: password,
      }),
    });
    if (res.ok) {
      console.log("Login successful");
      router.push("/protected/main");
      resultRef.current!.classList.remove("text-red-500");
      resultRef.current!.classList.add("text-gray-500");
      resultRef.current!.innerText = "Login successful";
    } else {
      console.error("Login failed");
      resultRef.current!.classList.remove("text-gray-500");
      resultRef.current!.classList.add("text-red-500");
      resultRef.current!.innerText = "Login failed";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-max flex-col gap-4 rounded border bg-white p-8"
    >
      <Label htmlFor="user">User</Label>
      <Input
        id="text"
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
      <span ref={resultRef}></span>
    </form>
  );
};
