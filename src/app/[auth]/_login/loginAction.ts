"use server";

import { cookies } from "next/headers";
import { api } from "~/trpc/server";

export const onSubmit = async (formData: FormData) => {
  const body = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const res = await api.auth.login(body);

  console.log(body, res);

  if (res.success) {
    cookies().set("authorization", res.token!, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: Date.now() + 60 * 60 * 24 * 30,
    });
  }

  return res;
};
