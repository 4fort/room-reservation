"use server";
import { api } from "~/trpc/server";

export const onSubmit = async (formData: FormData) => {
  const body = {
    first_name: formData.get("first_name") as string,
    middle_name: formData.get("middle_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    phone: formData.get("phone") as string,
    passwordForm: {
      password: formData.get("passwordForm.password") as string,
      password_confirm: formData.get("passwordForm.password_confirm") as string,
    },
  };

  console.log(formData);

  console.log(body);

  return await api.auth.signup(body);
};
