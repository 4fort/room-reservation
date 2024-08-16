import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { cookies } from "next/headers";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        first_name: z
          .string({
            required_error: "First name is required",
          })
          .min(1, { message: "First name cannot be empty" })
          .max(32, { message: "First name is too long" }),
        middle_name: z.string().nullish(),
        last_name: z
          .string({
            required_error: "Last name is required",
          })
          .min(1, { message: "Last name cannot be empty" })
          .max(32, { message: "Last name is too long" }),
        username: z
          .string({
            required_error: "Username is required",
          })
          .min(3, { message: "Username must be at least 3 characters long" })
          .max(32, { message: "Username cannot be longer than 32 characters" }),
        email: z
          .string({
            required_error: "Email is required",
          })
          .email(),
        phone: z
          .string()
          .regex(/^[0-9]{10,15}$/, {
            message: "Phone number must be between 10 and 15 digits",
          })
          .nullish(),
        passwordForm: z
          .object({
            password: z.string(),
            password_confirm: z.string(),
          })
          .refine((data) => data.password === data.password_confirm, {
            message: "Passwords do not match",
          }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const hashedPassword = bcrypt.hashSync(input.passwordForm.password, 10);

      const user = await ctx.db.user.create({
        data: {
          first_name: input.first_name,
          middle_name: input.middle_name,
          last_name: input.last_name,
          username: input.username,
          email: input.email,
          phone: input.phone,
          password: hashedPassword,
        },
      });

      if (!user) {
        return {
          credentials: null,
          success: false,
          user,
        };
      }

      return {
        credentials: {
          email: input.email,
          password: input.passwordForm.password,
        },
        success: true,
      };
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (!user) {
        return {
          success: false,
        };
      }

      if (!bcrypt.compareSync(input.password, user.password)) {
        return {
          success: false,
        };
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const alg = "HS256";

      const jwt = await new jose.SignJWT()
        .setProtectedHeader({ alg })
        .setExpirationTime("24h")
        .setSubject(user.id.toString())
        .sign(secret);

      return {
        success: true,
        role: user.role,
        token: jwt,
      };
    }),
  getID: publicProcedure.query(async () => {
    const cookie = cookies().get("authorization")?.value;

    if (!cookie) return 0;

    const jwt = jose.decodeJwt(cookie ?? "");

    return Number(jwt.sub);
  }),
});
