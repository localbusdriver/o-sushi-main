"use client";
import { FC, useState, useRef } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const LoginPage: FC = () => {
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
        email: "",
      }),
    });
    if (res.ok) {
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
    <div className="page">
      <form
        onSubmit={handleSubmit}
        className="border rounded max-w-max p-8 mx-auto flex flex-col gap-4"
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
    </div>
  );
};

export default LoginPage;
