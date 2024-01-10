"use client";

import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import { EyeIcon, EyeSlashIcon, KeyIcon } from "@heroicons/react/20/solid";

import { ResetPasswordSchema, ResetPasswordType } from "@/lib/zod/auth-schema";
import { registerUser, resetPassword } from "@/actions/auth-actions";
import { toast } from "react-toastify";
import { PasswordStrength } from "../../signup/_components/password-strength";

type Props = {
  jwtUserId: string;
};

export const ResetPasswordForm = ({ jwtUserId }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [passStrength, setPassStrength] = useState(0);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  let PasswordIcon = isPasswordVisible ? EyeSlashIcon : EyeIcon;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordType> = async (data) => {
    try {
      const result = await resetPassword(jwtUserId, data.password);
      if (result === "success") {
        toast.success("Your password has been reset successfully!");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const watchPassword = watch("password");

  useEffect(() => {
    setPassStrength(passwordStrength(watchPassword).id);
  }, [watchPassword]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 p-2 m-2 shadow border rounded-md"
    >
      <div className="text-center p-2">Reset your password</div>
      <Input
        {...register("password")}
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        label="Password"
        className="col-span-2"
        type={isPasswordVisible ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
        endContent={
          <PasswordIcon
            className="w-4 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        }
      />
      <PasswordStrength passStrength={passStrength} />
      <Input
        {...register("confirmPassword")}
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        label="Confirm Password"
        className="col-span-2"
        type={isPasswordVisible ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
      />
      <div className="flex justify-center col-span-2">
        <Button type="submit" color="primary" className="w-48">
          Submit
        </Button>
      </div>
    </form>
  );
};
