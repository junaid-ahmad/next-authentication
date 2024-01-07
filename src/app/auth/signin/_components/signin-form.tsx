"use client";

import { SigninFormSchema, SigninFormType } from "@/lib/zod/auth-schema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
  callbackUrl?: string;
};

export const SignInForm = ({ callbackUrl }: Props) => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  let PasswordIcon = isPasswordVisible ? EyeSlashIcon : EyeIcon;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SigninFormSchema),
  });

  const submitUser: SubmitHandler<SigninFormType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });

    if (!!!result?.ok) {
      toast.error(result?.error);
      return;
    }

    toast.success("Welcome to my world!");
    router.push(callbackUrl ? callbackUrl : "/");
  };

  return (
    <form
      onSubmit={handleSubmit(submitUser)}
      className="flex flex-col gap-3 border rounded-md shadow overflow-hidden w-1/2 mt-4"
    >
      <div className="p-2 text-center bg-gradient-to-b from-white to-slate-300 dark:from-slate-600 dark:to-slate-900">
        Sign In Form
      </div>
      <div className="p-2 flex flex-col gap-2">
        <Input
          {...register("email")}
          label="Email"
          errorMessage={errors.email?.message}
        />
        <Input
          {...register("password")}
          label="Password"
          errorMessage={errors.password?.message}
          type={isPasswordVisible ? "text" : "password"}
          endContent={
            <PasswordIcon
              className="w-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          }
        />
        <div className="flex justify-center items-center gap-2">
          <Button
            type="submit"
            color="primary"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
          <Button as={Link} href="/auth/signup">
            Sign up
          </Button>
        </div>
      </div>
    </form>
  );
};
