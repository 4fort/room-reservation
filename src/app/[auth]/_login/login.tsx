"use client";

import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import SubmitButton from "~/app/_components/submit-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { onSubmit } from "./loginAction";

type LoginProps = {
  callbackUrl?: string;
};

export default function Login({ callbackUrl }: LoginProps) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    try {
      const res = await onSubmit(form);

      if (!res.success) {
        router.push("/login");
      }

      if (callbackUrl) {
        router.push(callbackUrl);
      }

      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col">
            <div className="">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="text" />
            </div>
            <div className="">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <SubmitButton text="Login" />
        </CardFooter>
      </form>
    </Card>
  );
}
