"use client";

import { useEffect, useState } from "react";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import { cn } from "clsx-tailwind-merge";

import { FormSchema, FormType } from "@/lib/form-schema";
import PasswordStrength from "./password-strength";

const SignupForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [passStrength, setPassStrength] = useState(0);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  let PasswordIcon = isPasswordVisible ? EyeSlashIcon : EyeIcon;

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      accepted: undefined,
    },
    resolver: zodResolver(FormSchema),
  });

  const submitUser: SubmitHandler<FormType> = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    setPassStrength(passwordStrength(watch("password")).id);
  }, [watch("password")]);

  return (
    <form
      onSubmit={handleSubmit(submitUser)}
      className="grid grid-cols-2 gap-3 p-2 place-self-stretch shadow border rounded-md"
    >
      {passStrength}
      <Input
        {...register("firstName")}
        errorMessage={errors.firstName?.message}
        isInvalid={!!errors.firstName}
        label="First Name"
        startContent={<UserIcon className="w-4" />}
      />
      <Input
        {...register("lastName")}
        errorMessage={errors.lastName?.message}
        isInvalid={!!errors.lastName}
        label="Last Name"
        startContent={<UserIcon className="w-4" />}
      />
      <Input
        {...register("email")}
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        label="Email"
        className="col-span-2"
        type="email"
        startContent={<EnvelopeIcon className="w-4" />}
      />
      <Input
        {...register("phone")}
        errorMessage={errors.phone?.message}
        isInvalid={!!errors.phone}
        label="Phone"
        className="col-span-2"
        startContent={<PhoneIcon className="w-4" />}
      />
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
      <Controller
        control={control}
        name="accepted"
        render={({ field }) => (
          <Checkbox
            onChange={field.onChange}
            onBlur={field.onBlur}
            className="col-span-2"
          >
            I accept the <Link href="/terms">Terms</Link>{" "}
          </Checkbox>
        )}
      />
      {!!errors.accepted && (
        <p className="text-red-500">{errors.accepted.message}</p>
      )}
      <div className="flex justify-center col-span-2">
        <Button type="submit" color="primary" className="w-48">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
