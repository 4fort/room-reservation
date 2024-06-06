import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Register from "./_register/register";
import Login from "./_login/login";

export default function AuthPage({
  params,
  searchParams,
}: {
  params: { auth: string };
  searchParams: { callbackUrl?: string };
}) {
  console.log(searchParams);

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Tabs defaultValue={params.auth}>
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login callbackUrl={searchParams.callbackUrl} />
          </TabsContent>
          <TabsContent value="signup">
            <Register />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
