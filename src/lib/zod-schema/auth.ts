import { z } from "zod";
import validator from "validator";

export const SignupFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must have atleast 2 characters")
      .max(30, "First name must be less than 30 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),
    lastName: z
      .string()
      .min(2, "Last name must have atleast 2 characters")
      .max(30, "Last name must be less than 30 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number"),
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters")
      .max(20, "Password must be less than 20 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be atleast 6 characters")
      .max(20, "Password must be less than 20 characters"),
    accepted: z.literal(true, {
      errorMap: () => ({
        message: "Please accept all terms",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesnt match",
    path: ["confirmPassword"],
  });

export type SignupFormType = z.infer<typeof SignupFormSchema>;

export const SigninFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

export type SigninFormType = z.infer<typeof SigninFormSchema>;
