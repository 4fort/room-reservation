import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
import { api } from "~/trpc/server";

export default function Login() {
  const onSubmit = async (formData: FormData) => {
    "use server";
    const body = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const res = await api.auth.login(body);

    if (!res.success) {
      redirect("/login?error=true");
    }

    cookies().set("authorization", res.token!, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: Date.now() + 60 * 60 * 24 * 30,
    });

    redirect("/");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <form action={onSubmit}>
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
