"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Image, Input } from "@nextui-org/react";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";

import { EmailSchema, EmailType } from "@/lib/zod/auth-schema";
import { forgotPassword } from "@/actions/auth-actions";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmailType>({
    defaultValues: { email: "" },
    resolver: zodResolver(EmailSchema),
  });

  const onSubmit: SubmitHandler<EmailType> = async (data) => {
    try {
      await forgotPassword(data.email);
      toast.success("Reset password link was sent to your email.");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-2 m-2 border rounded-md shadow"
      >
        <div className="text-center">Enter your email</div>
        <Input
          {...register("email")}
          label="Email"
          startContent={<EnvelopeIcon className="w-4" />}
          errorMessage={errors.email?.message}
        />
        <Button
          isLoading={isSubmitting}
          disabled={isSubmitting}
          color="primary"
          type="submit"
        >
          {isSubmitting ? "Please wait..." : "Submit"}
        </Button>
      </form>
      <Image
        src="/login.png"
        alt="forgot password"
        width={500}
        height={500}
        className="col-span- place-self-center"
      />
    </div>
  );
};

export default ForgotPasswordPage;
