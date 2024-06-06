import { redirect } from "next/navigation";
import React from "react";
import SubmitButton from "~/app/_components/submit-button";
import { Button } from "~/components/ui/button";
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

export default function Register() {
  const onSubmit = async (formData: FormData) => {
    "use server";
    const body = {
      first_name: formData.get("first_name") as string,
      middle_name: formData.get("middle_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      phone: formData.get("phone") as string,
      passwordForm: {
        password: formData.get("password_1") as string,
        password_confirm: formData.get("password_2") as string,
      },
    };
    console.log(body);

    const res = await api.auth.signup(body);

    if (res.success) {
      redirect("/login");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <form action={onSubmit}>
        <CardContent className="grid gap-4">
          <fieldset className="grid grid-cols-3 gap-4 border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Personal Information
            </legend>
            <div className="">
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" name="first_name" type="text" />
            </div>
            <div className="">
              <Label htmlFor="middle_name">Middle Name</Label>
              <Input id="middle_name" name="middle_name" type="text" />
            </div>
            <div className="">
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" name="last_name" type="text" />
            </div>
          </fieldset>
          <fieldset className="grid grid-cols-3 gap-4 border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Contact Information
            </legend>
            <div className="">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" />
            </div>
            <div className="">
              <Label htmlFor="middle_name">Phone number</Label>
              <Input id="phone" name="phone" type="text" />
            </div>
          </fieldset>
          <fieldset className="grid grid-cols-3 gap-4 border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Other</legend>
            <div className="">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" />
            </div>
            <div className="">
              <Label htmlFor="password_1">Password</Label>
              <Input id="password_1" name="password_1" type="password" />
            </div>
            <div className="">
              <Label htmlFor="password_2">Confirm Password</Label>
              <Input id="password_2" name="password_2" type="password" />
              <span className="sr-only" id="password_confirm"></span>
            </div>
          </fieldset>
        </CardContent>
        <CardFooter className="justify-end">
          <SubmitButton text="Register" />
        </CardFooter>
      </form>
    </Card>
  );
}
