"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
import { onSubmit } from "../../[auth]/_register/registerAction";
import { onSubmit as onSubmitLogin } from "../../[auth]/_login/loginAction";

type ErrorMessageType = {
  validation?: string;
  code: string;
  message: string;
  path: string[];
};

const FORM_FIELDS = [
  {
    legend: "Personal Information",
    fields: [
      {
        name: "first_name",
        label: "First Name",
        type: "text",
      },
      {
        name: "middle_name",
        label: "Middle Name",
        type: "text",
      },
      {
        name: "last_name",
        label: "Last Name",
        type: "text",
      },
    ],
  },
  {
    legend: "Contact Information",
    fields: [
      {
        name: "email",
        label: "Email",
        type: "email",
      },
      {
        name: "phone",
        label: "Phone",
        type: "text",
      },
    ],
  },
  {
    legend: "Other",
    fields: [
      {
        name: "username",
        label: "Username",
        type: "text",
      },
      {
        name: "passwordForm.password",
        label: "Password",
        type: "password",
      },
      {
        name: "passwordForm.password_confirm",
        label: "Confirm Password",
        type: "password",
      },
    ],
  },
];

export default function Register() {
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const router = useRouter();

  const handleInputChange = (name: string) => {
    if (errors) {
      const keysToDelete = Object.keys(errors).filter((key) =>
        key.startsWith(name),
      );

      if (keysToDelete.length > 0) {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          keysToDelete.forEach((key) => delete newErrors[key]);
          return Object.keys(newErrors).length > 0 ? newErrors : null;
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    try {
      const res = await onSubmit(form);
      console.log(res);

      if (res.success) {
        const loginForm = new FormData();
        loginForm.append("email", form.get("email") as string);
        loginForm.append(
          "password",
          form.get("passwordForm.password") as string,
        );

        const loginRes = await onSubmitLogin(loginForm);

        if (!loginRes.success) {
          router.push("/login");
        }
        router.push("/");
      }
    } catch (error: any) {
      const errorObj = JSON.parse(error.message).reduce(
        (acc: Record<string, string>, curr: ErrorMessageType) => {
          const errorKey = curr.path.join(".");
          acc[errorKey] = curr.message;
          return acc;
        },
        {},
      );
      setErrors(errorObj);
    }
  };

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              {FORM_FIELDS.map(({ legend, fields }) => (
                <fieldset
                  className="grid grid-cols-3 gap-4 border p-4"
                  key={legend}
                >
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    {legend}
                  </legend>
                  {fields.map(({ name, label, type }) => (
                    <div key={name}>
                      <Label htmlFor={name}>{label}</Label>
                      <Input
                        id={name}
                        name={name}
                        type={type}
                        className={errors?.[name] ? "border-red-500" : ""}
                        onChange={() => handleInputChange(name)}
                      />
                      {errors?.[name] && (
                        <p className="text-red-500">{errors[name]}</p>
                      )}
                    </div>
                  ))}
                </fieldset>
              ))}
            </CardContent>
            <CardFooter className="justify-end">
              <SubmitButton text="Register" />
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
