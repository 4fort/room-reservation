import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
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

type LoginProps = {
  searchParams: {
    callbackUrl?: string;
  };
};

export default async function Login({ searchParams }: LoginProps) {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Tabs defaultValue="client">
          <TabsList>
            <TabsTrigger value="client">Client</TabsTrigger>
            <TabsTrigger value="manager">Manager</TabsTrigger>
          </TabsList>
          <TabsContent value="client">
            <ClientLogin callbackUrl={searchParams.callbackUrl} />
          </TabsContent>
          <TabsContent value="manager">
            <ManagerLogin />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

async function ClientLogin({ callbackUrl }: { callbackUrl?: string }) {
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

    if (callbackUrl) {
      redirect(callbackUrl);
    }

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
              <Input id="email" name="email" type="text" required />
            </div>
            <div className="">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
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

async function ManagerLogin() {
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
        <CardTitle>Login Manager</CardTitle>
      </CardHeader>
      <form action={onSubmit}>
        <CardContent>
          <div className="flex flex-col">
            <div className="">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="text" required />
            </div>
            <div className="">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
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
